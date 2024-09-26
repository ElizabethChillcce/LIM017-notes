export const deleteNote = () => {
  console.log("hola entramos al mocks");
};

export const watchNotesDos = jest.fn((setNotesCallback) => {
  const notes = [
    {
      autor: "eli.chillcce.08@gmail.com",
      description: "Lab Notes red social card",
      id: "1X6k9J5v68b4xOq9Ub7p",
      timeStamp: "12 de julio de 2022, 19:52:35 UTC-5",
      title: "Proyecto lab",
    },
  ];
  console.log("este es el Mock", setNotesCallback);
  setNotesCallback(notes);
});

export const db = () => Promise.resolve({});

export function AuthProvider({ children }) {
  return <>{children}</>;
}
