import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";

const useIsGroupMember = (groupId: number) => {
  const { isUserGroupMember } = useUser();
  const [isMember, setIsMember] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const checkIsGroupMember = async () => {
    try {
      setError(null);
      const memberStatus = await isUserGroupMember(groupId);
      setIsMember(memberStatus);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to check membership";
      setError(errorMsg);
      console.error(`Error checking membership for group ${groupId}:`, err);
    }
  };

  useEffect(() => {
    checkIsGroupMember();
  }, [groupId, isUserGroupMember]);

  return {
    isMember,
    setIsMember,
    error,
    refreshMembership: checkIsGroupMember,
  };
};

export default useIsGroupMember;
