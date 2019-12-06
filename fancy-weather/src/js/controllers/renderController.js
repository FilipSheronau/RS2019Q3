export default function (tag, path, atr, inner) {
  const elem = document.createElement(tag);
  Object.entries(atr).forEach(([key, val]) => {
    elem.setAttribute(key, val);
  });
  if (inner != null) elem.innerHTML = inner;
  document.querySelector(`${path}`).append(elem);
}
