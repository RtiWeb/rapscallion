import { default as React } from "react";
import { range } from "lodash";

import { render } from "../src";


const DEPTH = 7;
const CACHE_DIVS = "CACHE_DIVS";
const CACHE_COMPONENT = "CACHE_COMPONENT";


const Component = ({ depth, leafText, cacheMe }) => {
  if (depth === 1) {
    return (
      <div>
        {leafText}
      </div>
    );
  }

  const newDepth = depth - 1;
  return (
    <div
      cacheKey={
        cacheMe === CACHE_DIVS ?
          `Div:${depth}` :
          null
      }
    >
      {
        range(depth).map(idx => (
          <Component
            depth={newDepth}
            leafText={leafText}
            key={idx}
            cacheKey={
              cacheMe === CACHE_COMPONENT ?
                `Component:${depth}` :
                null
            }
          />
        ))
      }
    </div>
  );
};

render(
  <Component
    depth={DEPTH}
    leafText="hi there! © <"
  />
).toPromise().then(html => {
  console.log(html);
});