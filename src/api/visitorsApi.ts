import api from "./api";
import type {
  Visitor,
  VisitorStatus,
} from "../features/visitors-types";

interface CreateVisitorData {
  name: string;
  phone: string;
  unit: string;
  visitDate: string;
}

export const getVisitors = async () => {
  const response = await api.get<Visitor[]>("/visitors");
  return response.data;
};

export const createVisitor = async (
  data: CreateVisitorData
) => {
  const response = await api.post<Visitor>("/visitors", {
    ...data,
    status: "Pending",
  });

  return response.data;
};

export const updateVisitorStatus = async (
  id: string,
  status: VisitorStatus
) => {
  const response = await api.patch<Visitor>(
    `/visitors/${id}`,
    { status }
  );

  return response.data;
};

export const deleteVisitor = async (id: string) => {
  await api.delete(`/visitors/${id}`);
};