export type VisitorStatus = "Pending" | "Approved" | "Rejected";

export interface Visitor {
  id: string;
  name: string;
  phone: string;
  unit: string;
  visitDate: string;
  status: VisitorStatus;
}

export interface CreateVisitorPayload {
  name: string;
  phone: string;
  unit: string;
  visitDate: string;
}

export interface VisitorState {
  visitors: Visitor[];
  loading: boolean;
  error: string | null;
}