import { JSX, memo } from 'react';

import { ResponsePayload } from '~entities/superhero/api/search-superheros.ts';

import { ResponseError, ResponseSuccess } from '~shared/response.ts';

type Props = {
  data?: ResponseSuccess<ResponsePayload> | ResponseError;
  isLoading: boolean;
  error: Error | null;
};

export const HeroesList = memo(function HeroesList(props: Props): JSX.Element {
  const { data, isLoading, error } = props;

  if (isLoading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (error || data?.response === 'error') {
    return <p className="text-red-500">Failed to load superhero data.</p>;
  }

  if (data?.results?.length === 0) {
    return <p className="text-gray-500">No superheroes found.</p>;
  }

  return (
    <ul className="mt-4 list-inside list-disc">
      {data?.results?.map((hero) => (
        <li key={hero.id}>
          <a href={`/${hero.id}`}>{hero.name}</a>
        </li>
      ))}
    </ul>
  );
});
