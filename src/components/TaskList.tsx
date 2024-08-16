import { useEffect, useState, useRef } from "react";

import { TaskTimer } from "./TaskTimer";

import supabase from "../lib/supabase";

import "../styles/TaskList.scss";

export function TaskList({ user }: any) {
  const newTimerTextRef = useRef();

  const [timers, setTimers] = useState([]);
  const [errorText, setError] = useState("");

  useEffect(() => {
    fetchTodos().catch(console.error);
  }, []);

  const fetchTodos = async () => {
    let { data: timers, error } = await supabase
      .from("tasks")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log("error", error);
    } else {
      setTimers(timers as any);
    }
  };

  const addTimer = async () => {
    // @ts-ignore
    let timerText = newTimerTextRef?.current?.value;
    let task_title = timerText.trim();
    if (task_title.length === 0) {
      setError("Task name shouldn't be empty !");
    } else {
      let { data: timer, error } = await supabase
        .from("tasks")
        .insert({ task_title, user_id: user.id })
        .select();

      if (error !== null) {
        setError(error.message);
      } else {
        // @ts-ignore
        setTimers([...timer, ...timers]);
        setError("");
        // @ts-ignore
        newTimerTextRef.current.value = "";
      }
    }
  };

  const deleteTimer = async (id: any) => {
    try {
      await supabase.from("tasks").delete().eq("id", id);
      setTimers(timers.filter((x: any) => x.id !== id));
    } catch (error) {
      console.log("error", error);
    }
  };

  const startTimer = async (id: any) => {
    let start_time = new Date().getTime();
    try {
      await supabase
        .from("tasks")
        .update({ is_active: true, start_time })
        .eq("id", id);
    } catch (error) {
      console.log("error", error);
    }
  };

  const stopTimer = async (id: any) => {
    let { data, error } = await supabase
      .from("tasks")
      .select(`start_time, task_time`)
      .eq("id", id);

    if (error) {
      setError(error.message);
    }

    let current_time = new Date().getTime();
    // @ts-ignore
    let task_time = current_time - data[0].start_time + data[0].task_time;

    try {
      await supabase
        .from("tasks")
        .update({ is_active: false, task_time, start_time: null })
        .eq("id", id);
    } catch (error) {
      console.log("error", error);
    }
  };

  const resetTimer = async (id: any) => {
    try {
      await supabase
        .from("tasks")
        .update({ is_active: false, task_time: null, start_time: null })
        .eq("id", id);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="task-list">
      <h3>Tasks</h3>

      {timers.length ? (
        timers.map((timer: any) => (
          <TaskTimer
            data={timer}
            onStart={() => startTimer(timer.id)}
            onStop={() => stopTimer(timer.id)}
            onDelete={() => deleteTimer(timer.id)}
            onReset={() => resetTimer(timer.id)}
            key={timer.id}
          />
        ))
      ) : (
        <div className="task-list__empty">There are no tasks yet.</div>
      )}

      <div className="new-timer">
        <input
          // @ts-ignore
          ref={newTimerTextRef}
          placeholder="Name your task"
          type="text"
          onKeyUp={(e: any) => e.key === "Enter" && addTimer()}
        />
        <button className="turquoise-flow" onClick={addTimer}>
          + Add Timer
        </button>
      </div>
      {!!errorText && <div className="error-text">{errorText}</div>}
    </div>
  );
}
