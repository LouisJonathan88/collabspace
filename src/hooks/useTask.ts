import { useState, useEffect } from "react";
import {
  createTask,
  subscribeToTasks,
  updateTask,
  updateTaskOrders,
  deleteTask,
} from "../lib/firestore";
import { useAuth } from "../context/AuthContext";
import type { Task, TaskColumn } from "../types";

interface UseTaskReturn {
  tasks: Task[];
  todoTasks: Task[];
  doingTasks: Task[];
  doneTasks: Task[];
  loading: boolean;
  error: string | null;
  handleCreateTask: (
    title: string,
    description: string,
    assigneeId: string,
    assigneeName: string
  ) => Promise<void>;
  handleUpdateTask: (
    taskId: string,
    title: string,
    description: string,
    assigneeId: string,
    assigneeName: string
  ) => Promise<void>;
  handleReorderTasks: (
    updates: { id: string; column: TaskColumn; order: number }[]
  ) => Promise<void>;
  handleDeleteTask: (taskId: string) => Promise<void>;
  clearError: () => void;
}

export function useTask(projectId: string): UseTaskReturn {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Subscribe realtime ke semua tasks
  useEffect(() => {
    if (!projectId) return;

    const unsubscribe = subscribeToTasks(projectId, (data) => {
      setTasks(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [projectId]);

  // Filter tasks per kolom
  const todoTasks = tasks.filter((t) => t.column === "todo");
  const doingTasks = tasks.filter((t) => t.column === "doing");
  const doneTasks = tasks.filter((t) => t.column === "done");

  // Buat task baru
  async function handleCreateTask(
    title: string,
    description: string,
    assigneeId: string,
    assigneeName: string
  ): Promise<void> {
    if (!user) return;
    setError(null);
    try {
      await createTask(
        projectId,
        title,
        description,
        assigneeId,
        assigneeName
      );
    } catch {
      setError("Gagal membuat task. Silakan coba lagi.");
    }
  }

  // Edit task
  async function handleUpdateTask(
    taskId: string,
    title: string,
    description: string,
    assigneeId: string,
    assigneeName: string
  ): Promise<void> {
    if (!user) return;
    setError(null);
    try {
      await updateTask(
        projectId,
        taskId,
        title,
        description,
        assigneeId,
        assigneeName
      );
    } catch {
      setError("Gagal mengubah task. Silakan coba lagi.");
    }
  }

  async function handleReorderTasks(
    updates: { id: string; column: TaskColumn; order: number }[]
  ): Promise<void> {
    if (!user) return;
    setError(null);

    setTasks((prev) => {
      const updateMap = new Map(updates.map((u) => [u.id, u]));
      return prev.map((t) => {
        if (updateMap.has(t.id)) {
          const newVals = updateMap.get(t.id)!;
          return { ...t, column: newVals.column, order: newVals.order };
        }
        return t;
      });
    });

    try {
      await updateTaskOrders(projectId, updates);
    } catch {
      setError("Gagal menyusun ulang task. Silakan coba lagi.");
    }
  }

  // Hapus task
  async function handleDeleteTask(taskId: string): Promise<void> {
    if (!user) return;
    setError(null);
    try {
      await deleteTask(projectId, taskId);
    } catch {
      setError("Gagal menghapus task. Silakan coba lagi.");
    }
  }

  function clearError(): void {
    setError(null);
  }

  return {
    tasks,
    todoTasks,
    doingTasks,
    doneTasks,
    loading,
    error,
    handleCreateTask,
    handleUpdateTask,
    handleReorderTasks,
    handleDeleteTask,
    clearError,
  };
}