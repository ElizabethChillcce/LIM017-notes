export const deleteNote = jest.fn();

export const watchNotesDos = (setNotesCallback) => {
  const notes = [
    {
      autor: "eli.chillcce.08@gmail.com",
      description: "Lab Notes red social card",
      id: "1X6k9J5v68b4xOq9Ub7p",
      timeStamp: {
        toDate() {
          return {
            toLocaleString: () => "2020-01-01",
          }
        }
      },
      title: "Proyecto lab",
    },
  ];
  console.log("este es el Mock", setNotesCallback);
  setNotesCallback(notes);
};

export const db = () => Promise.resolve({});

export function AuthProvider({ children }) {
  return <>{children}</>;
}
