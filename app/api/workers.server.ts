import { faker } from "@faker-js/faker";

export function findWorkers(query: string): Worker[] {
  const queryParts = query.trim().split(/\s+/);

  const filteredWorkers =
    query.trim().length === 0
      ? workers
      : workers.filter((worker) =>
          queryParts.every((part) =>
            worker.name.toLocaleLowerCase().includes(part.toLocaleLowerCase()),
          ),
        );

  const topFilteredWorkers = filteredWorkers.slice(0, 10);

  return topFilteredWorkers;
}

export function getWorker(id: number): Worker {
  const result = workers.find((worker) => worker.id === id);

  if (!result) {
    throw new Error(`Could not find worker with id ${id}`);
  }

  return result;
}

const workers: Worker[] = Array.from({ length: 100 })
  .map((_, i) => ({
    id: i,
    name: faker.person.fullName(),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

type Worker = { id: number; name: string };
