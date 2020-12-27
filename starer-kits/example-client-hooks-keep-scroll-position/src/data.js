import range from "lodash/range";

export default range(1000).map(i => ({
  title: `Item ${i}`,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  img:
    "https://images.unsplash.com/photo-1593642634627-6fdaf35209f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
}));
