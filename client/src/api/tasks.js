// Simule une API
export const fetchTasks = () =>
  Promise.resolve({
    data: [
      { id: 1, title: "Lire la doc React", column: "todo" },
      { id: 2, title: "Coder l'UI", column: "doing" },
      { id: 3, title: "Initialiser le projet", column: "done" },
    ],
  });
