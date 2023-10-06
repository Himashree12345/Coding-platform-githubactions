import { renderHook } from '@testing-library/react-hooks';
import useOutput from './useOutput';

test('updates output state with job output', async () => {
  const jobId = 'abc123';
  const jobOutput = 'Hello, world!';
  const getJobStatus = jest.fn(() => Promise.resolve({ success: true, job: { status: 'completed', output: jobOutput } }));

  const { result, waitForNextUpdate } = renderHook(() => useOutput(jobId, getJobStatus));
  expect(result.current.output).toBe(null);

  await waitForNextUpdate();
  expect(getJobStatus).toHaveBeenCalledWith(jobId);
  expect(result.current.output).toBe(jobOutput);
});

test('does not update output state with pending job', async () => {
  const jobId = 'abc123';
  const getJobStatus = jest.fn(() => Promise.resolve({ success: true, job: { status: 'pending' } }));

  const { result, waitForNextUpdate } = renderHook(() => useOutput(jobId, getJobStatus));
  expect(result.current.output).toBe(null);

  await waitForNextUpdate();
  expect(getJobStatus).toHaveBeenCalledWith(jobId);
  expect(result.current.output).toBe(null);
});

test('does not update output state with failed job', async () => {
  const jobId = 'abc123';
  const getJobStatus = jest.fn(() => Promise.resolve({ success: false, error: 'Job failed' }));

  const { result, waitForNextUpdate } = renderHook(() => useOutput(jobId, getJobStatus));
  expect(result.current.output).toBe(null);

  await waitForNextUpdate();
  expect(getJobStatus).toHaveBeenCalledWith(jobId);
  expect(result.current.output).toBe(null);
});