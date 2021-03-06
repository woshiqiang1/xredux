import xredux from '../src/index';

it('should handle dispatch reducers action', () => {
  const instance = xredux.create();
  const store = instance.createStore();
  instance.model({
    namespace: 'app',
    initialState: {
      count: 0,
    },
    reducers: {
      add(state) {
        return {
          ...state,
          count: state.count + 1,
        };
      },
    },
  });
  instance.actions.app.add();
  const state = store.getState();
  expect(state.app.count).toBe(1);
});

it('should handle dispatch effects action', async () => {
  const instance = xredux.create();
  const store = instance.createStore();
  instance.model({
    namespace: 'app',
    initialState: {
      count: 0,
    },
    reducers: {
      add(state) {
        return {
          ...state,
          count: state.count + 1,
        };
      },
    },
    effects: {
      async addAsync() {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
        instance.actions.app.add();
      },
    },
  });
  const result = await instance.actions.app.addAsync();
  expect(result).toBe(undefined);
  const state = store.getState();
  expect(state.app.count).toBe(1);
});
