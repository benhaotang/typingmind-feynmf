function render_feynman_diagram(params) {
  const { title, width, height, feynMF_code } = params;

  // Split the feynMF_code string into an array for the "diagram" field
  const diagram = feynMF_code.split("\n").filter(line => line.trim() !== "");

  const diagramJSON = JSON.stringify({
    title: title,
    width: width,
    height: height,
    lang: "latex", // Default to LaTeX
    diagram: diagram
  }, null, 2); // Pretty-print JSON for readability in HTML

  const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/svg.js/1.1.1/svg.min.js"></script>
    <script src="https://morcmarc.com/feynmanjs/doc/lib/svg.js/svg.foreign.js"></script>
    <script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      extensions: ["tex2jax.js"],
      jax: ["input/TeX", "output/HTML-CSS"],
      tex2jax: {
        inlineMath: [ ['$','$'], ["\$$","\$$"] ],
        displayMath: [ ['$$','$$'], ["\$$","\$$"] ],
        processEscapes: true
      },
      "HTML-CSS": { availableFonts: ["TeX"] }
    });
  </script>
  <script type="text/javascript"
    src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
  </script>
  <script src="https://morcmarc.com/feynmanjs/doc/feynman.js"></script>
</head>
<body>
<div class="feynmanjs">
${diagramJSON}
</div>
<script>
    // Initialize Feynman rendering
    var feynman = new Feynman();
</script>
</body>
</html>
  `;

  return htmlString;
}
