import axios from 'axios';
import { fetchProblems } from './ProblemList';

jest.mock('axios');

describe('fetchProblems', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('fetches problems successfully', async () => {
    const mockData = { success: true, problem: [{ id: 1, name: 'Problem 1' }, { id: 2, name: 'Problem 2' }] };
    axios.get.mockResolvedValueOnce({ data: mockData });

    const setProblem = jest.fn();
    const toastError = jest.fn();
    await fetchProblems(setProblem, toastError);

    expect(axios.get).toHaveBeenCalledWith(`${url}`);
    expect(setProblem).toHaveBeenCalledWith(mockData.problem);
    expect(toastError).not.toHaveBeenCalled();
  });

  test('handles fetch error', async () => {
    const mockError = new Error('Network error');
    axios.get.mockRejectedValueOnce(mockError);

    const setProblem = jest.fn();
    const toastError = jest.fn();
    await fetchProblems(setProblem, toastError);

    expect(axios.get).toHaveBeenCalledWith(`${url}`);
    expect(setProblem).not.toHaveBeenCalled();
    expect(toastError).toHaveBeenCalledWith('Something went wrong');
  });
});