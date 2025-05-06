// import css from './TextUpdaterNode.module.css';
// import { useCallback, useEffect, useState } from 'react';
// import { Handle, Position } from '@xyflow/react';

// function TextUpdaterNode({ id, data, isConnectable }) {
//   const handleStyle = { left: 10 };

//   const [value, setValue] = useState(data.label);

//   useEffect(() => {
//     setValue(data.label);
//   }, [data.label]);

//   const handleChange = e => {
//     setValue(e.target.value);
//   };

//   const handleBlur = () => {
//     window.dispatchEvent(
//       new CustomEvent('update-node-label', {
//         detail: { id, label: value },
//       })
//     );
//   };

//   return (
//     <div className={css.textUpdaterNode}>
//       <Handle
//         type="target"
//         position={Position.Top}
//         isConnectable={isConnectable}
//       />
//       <div>
//         <label htmlFor="text">Text:</label>
//         <input
//           id="text"
//           name="text"
//           value={value}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           className="nodrag"
//         />
//       </div>
//       <Handle
//         type="source"
//         position={Position.Bottom}
//         id="a"
//         style={handleStyle}
//         isConnectable={isConnectable}
//       />
//       <Handle
//         type="source"
//         position={Position.Bottom}
//         id="b"
//         isConnectable={isConnectable}
//       />
//     </div>
//   );
// }

// export default TextUpdaterNode;

import { Handle, Position } from '@xyflow/react';
import { useState, useEffect } from 'react';

type Props = {
  id: string;
  data: {
    label: string;
  };
  isConnectable: boolean;
};

function TextUpdaterNode({ id, data, isConnectable }: Props) {
  const [value, setValue] = useState(data.label);

  useEffect(() => {
    setValue(data.label);
  }, [data.label]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    window.dispatchEvent(
      new CustomEvent('update-node-label', {
        detail: { id, label: value },
      })
    );
  };

  return (
    <div
      style={{
        padding: 10,
        border: '1px solid #ddd',
        borderRadius: 6,
        background: 'white',
        width: 150,
        display: 'flex',
        backgroundColor: 'antiquewhite',
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <input
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{
          width: '100%',
          border: '1px solid #ccc',
          borderRadius: 4,
          padding: '2px 4px',
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
