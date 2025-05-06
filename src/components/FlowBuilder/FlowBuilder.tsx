import css from './FlowBuilder.module.css';

import {
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  useEdgesState,
  EdgeChange,
  Connection,
  Background,
  Controls,
} from '@xyflow/react';

import 'reactflow/dist/style.css';
import '@xyflow/react/dist/style.css';

import { useCallback, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TextUpdaterNode from '../TextUpdaterNode/TextUpdaterNode.tsx';
import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

function FlowBuilder() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useEdgesState<Edge>([]);

  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

  const ValidationSchema = yup.object().shape({
    node_Name: yup.string().min(3).required('Must be filled in'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ValidationSchema) });

  const onNodesChange: OnNodesChange = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges(eds => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges(eds => addEdge(params, eds)),
    [setEdges]
  );

  const AddNewNode = useCallback(
    (name: string, type: string) => {
      const id = uuidv4();

      const newNode = {
        id,
        data: { label: name },
        position: { x: Math.random() * 250, y: Math.random() * 250 },
        type,
      };

      const updatedNodes = [...nodes, newNode];
      setNodes(updatedNodes);
    },
    [nodes]
  );

  const handleAddNewNode = (data: { node_Name: string }) => {
    AddNewNode(data.node_Name, 'textUpdater');
    reset();
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <form className={css.form} onSubmit={handleSubmit(handleAddNewNode)}>
        <label className={css.label}>
          Node Name:
          <input
            className={css.input}
            type="text"
            placeholder="Node name"
            {...register('node_Name', { required: true })}
          />
          <span className={css.errorMessage}>{errors.node_Name?.message}</span>
        </label>

        <button className={css.btn} type="submit">
          Add Node
        </button>
      </form>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default FlowBuilder;
