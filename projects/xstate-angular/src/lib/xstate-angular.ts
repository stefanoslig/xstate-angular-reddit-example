import { EventObject, StateConfig, MachineOptions, interpret, State, InterpreterOptions, Interpreter, StateMachine } from 'xstate';
import { fromEventPattern, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface UseMachineOptions<TContext, TEvent extends EventObject> {
  /**
   * If provided, will be merged with machine's `context`.
   */
  context?: Partial<TContext>;
  /**
   * The state to rehydrate the machine to. The machine will
   * start at this state instead of its `initialState`.
   */
  state?: StateConfig<TContext, TEvent>;
}

export function useMachine<TContext, TStateSchema, TEvent extends EventObject>(
  machine: StateMachine<TContext, TStateSchema, TEvent>,
  options: Partial<InterpreterOptions> & Partial<UseMachineOptions<TContext, TEvent>> & Partial<MachineOptions<TContext, TEvent>> = {}
): {
  state$: Observable<State<TContext, TEvent>>;
  send: Interpreter<TContext, TStateSchema, TEvent>['send'];
  service: Interpreter<TContext, TStateSchema, TEvent>;
} {
  const { context, guards, actions, activities, services, delays, state: rehydratedState, ...interpreterOptions } = options;

  const machineConfig = {
    context,
    guards,
    actions,
    activities,
    services,
    delays
  };

  const createdMachine = machine.withConfig(machineConfig, {
    ...machine.context,
    ...context
  } as TContext);

  const service = interpret(createdMachine, interpreterOptions).start(rehydratedState ? State.create(rehydratedState) : undefined);

  const state$ = fromEventPattern<[State<TContext, TEvent>, EventObject]>(
    handler => service.onTransition(handler),
    (_, s) => s.stop()
  ).pipe(map(([state, _]) => state));

  return { state$, send: service.send, service };
}
