function formShortcode(children) {
  return `<section>
    <h2 id="input">Input</h2>
    <form action="${this.page.url}output/" method="get">
        ${children}
        <button type="submit">Submit</button>
    </form>
  </section>`;
}

function outputShortcode(children) {
  return `<section>
    <h2 id="output">Output</h2>
    ${children}
  </section>`;
}

module.exports = {
  formShortcode,
  outputShortcode,
};
