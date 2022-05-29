import create from 'zustand';

const valuesStore = create(
    set => ({
        values: {
            width: 15,
            height: 15,
            difficulty: 0
        },
        setValues: values => set({ values }),
        mazeId: '',
        setMazeId: async mazeId => set({ mazeId }),
    }),
);

export default valuesStore;
