import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGroup } from "../contexts/GroupContext";

const Group = () => {
  const { id } = useParams();
  const {
    group,
    setGroup,
    groupEvents,
    setGroupEvents,
    groupMembers,
    setGroupMembers,
    getGroupById,
    getEventsById,
    getGroupMembers,
    error,
    loading,
  } = useGroup();

  useEffect(() => {
    getEventsById(Number(id));
    getGroupById(Number(id));
    getGroupMembers(Number(id));
  }, [id]);

  return <div>Group</div>;
};

export default Group;
