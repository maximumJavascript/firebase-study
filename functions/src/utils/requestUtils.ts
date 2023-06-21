import { COMMENTS_OFFSET_LIMIT } from '../constants/comments';
import { Request } from 'express';

type TPaginationParams = {
  markerSec: number;
  markerNanosec: number;
  limit: number;
};
export function getPaginationParams(req: Request): TPaginationParams {
  const markerSec = Number(req.query.markerSec) || 0;
  const markerNanosec = Number(req.query.markerNanosec) || 0;
  const limit = Number(req.query.limit || COMMENTS_OFFSET_LIMIT);
  return { markerSec, markerNanosec, limit };
}
