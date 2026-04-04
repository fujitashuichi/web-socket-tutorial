const greetings = [
  "hello!",
  "good morning!",
  "good night!",
  "ciao!",
  "giorno!",
  "buona serra",
  "how have you been?",
  "come stai?"
]


export const randomGreeting = () => {
  const randomId = Math.floor(Math.random() * greetings.length);
  return greetings[randomId];
}
