"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import CustomInput from "@src/component/customeFormField"; // Adjust path if needed
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useGetAllUser } from "@src/hooks/apiHooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { usersData, sortOptions } from "@src/utils/helper";

export default function UserFilterPage() {
  const methods = useForm({
    defaultValues: {
      userId: "",
      sortBy: "",
    },
  });

  const { handleSubmit, reset } = methods;
  const router = useRouter();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const {
    isError: isUserError,
    isLoading: isUserLoading,
    data: userData,
    error: userError,
    mutate: userMutation,
  } = useGetAllUser();

  useEffect(() => {
    userMutation({ filter: undefined, userId: undefined });

    if (isUserError) {
      toast.error(userError?.message || "Failed to fetch users.");
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (userData?.data) {
      setFilteredUsers(userData.data);
    } else {
      setFilteredUsers(usersData);
    }
  }, [userData, reset]);

  const onSubmit = (data: { userId: string; sortBy: string }) => {
    const result = usersData;
    userMutation({
      filter: data.sortBy,
      userId: data.userId,
    });
    setFilteredUsers(result);
  };

  const handleReset = () => {
    userMutation({ filter: undefined, userId: undefined });
    if (userData?.data) {
      setFilteredUsers(userData.data);
    } else {
      setFilteredUsers(usersData);
    }
    reset({
      sortBy: "",
      userId: "",
    });
  };

  return (
    <FormProvider {...methods}>
      <Box className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Tracking Page</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap gap-4 mb-6 items-end"
        >
          <CustomInput
            name="userId"
            label="User ID"
            placeholder="Enter User ID"
            type="text"
            className="flex-1 min-w-[200px]"
          />
          <CustomInput
            name="sortBy"
            label="Sort By"
            placeholder="Select"
            type="autocomplete"
            options={sortOptions}
            className="flex-1 min-w-[200px]"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="h-14"
          >
            Filter
          </Button>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            className="h-14"
            onClick={handleReset}
          >
            Reset
          </Button>
        </form>

        <TableContainer component={Paper}>
          {isUserLoading ? (
            <Box className="flex justify-center p-10">
              <CircularProgress />
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Total Points</TableCell>
                  <TableCell>Rank</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  (() => {
                    const sortedUsers = [...filteredUsers].sort(
                      (a, b) => b.totalpoints - a.totalpoints
                    );
                    let currentRank = 1;
                    let lastPoints: number | null = null;
                    let skipCount = 0;

                    return sortedUsers.map((user, index) => {
                      if (lastPoints === user.totalpoints) {
                        skipCount++;
                      } else {
                        currentRank = currentRank + skipCount;
                        skipCount = 1;
                      }
                      lastPoints = user.totalpoints;

                      return (
                        <TableRow key={user.id}>
                          <TableCell>{user.user_id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.totalpoints}</TableCell>
                          <TableCell>{currentRank}</TableCell>
                        </TableRow>
                      );
                    });
                  })()
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Box>
    </FormProvider>
  );
}
