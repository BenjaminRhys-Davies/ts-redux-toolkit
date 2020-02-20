import { Action } from '@reduxjs/toolkit';
import { actions, reducer, /*selectors,*/ State } from './mainSlice';

describe('mainSlice', () => {
  const initialState: State = {
    a: false,
    b: 0,
    c: 'else',
  };

  it('has a default state', () => {
    expect(reducer(undefined, {} as Action)).toEqual(initialState);
  });

  describe('can handle a', () => {
    type Selector = {
      expected: unknown;
      selector: (s: State) => unknown;
    };
    const testData: {
      action: Action;
      name: string;
      selectors?: Selector[];
      state?: {
        next?: Partial<State>;
        root?: Partial<State>;
      };
    }[] = [
      {
        action: actions.decrement(),
        name: 'decriment',
        /*
        selectors: [
          { expected: initialState.a, selector: selectors.selectA },
          { expected: initialState.b, selector: selectors.selectB },
        ],
        */
        state: { root: { a: true, b: 1 } },
      },
      {
        action: actions.increment({ a: true }),
        name: 'increment',
        /*
        selectors: [
          { expected: true, selector: selectors.selectA },
          { expected: 1, selector: selectors.selectB },
        ],
        */
        state: { next: { a: true, b: 1 } },
      },
    ];

    testData.forEach(({ action, name, selectors = [], state: { next = {}, root = {} } = {} }) => {
      describe(`${name} action`, () => {
        let nextState: State;

        beforeAll(() => {
          nextState = reducer(
            {
              ...initialState,
              ...root,
            },
            action,
          );
        });

        it('returns expected state', () => {
          expect(nextState).toEqual(jasmine.objectContaining(next));
        });
        if (selectors.length) {
          describe('selector', () => {
            selectors.forEach(({ expected, selector }) => {
              it(`${selector.name} returns expected value`, () => {
                expect(selector(nextState)).toEqual(expected);
              });
            });
          });
        }
      });
    });
  });
});
