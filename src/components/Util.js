export const FetchCurrentUser = (currentUserUrl, setterFunction) => {
  fetch(currentUserUrl)
  .then(r => r.json())
  .then(data => setterFunction(data[0]))
}