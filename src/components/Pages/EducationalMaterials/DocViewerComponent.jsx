import React from "react";
import { DocViewer, DocViewerRenderers } from "react-doc-viewer";

const DocViewerComponent = ({ file }) => {
  const docs = [
    {
      uri: file,
    },
  ];

  return (
    <div style={{ height: "750px" }}>
      <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
    </div>
  );
};

export default DocViewer;
