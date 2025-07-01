import { ChangeEvent, JSX, useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { HeroesList } from '~app/components/heroes-list/heroes-list.tsx';
import { SearchInput } from '~app/components/search-input/search-input.tsx';
import { useDebounce } from '~app/hooks/useDebounce.ts';

import { superheroApi } from '~entities/superhero';

const DELAY = 300;

export function MainPage(): JSX.Element {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialQuery = searchParams.get('hero-name') || '';
  const [query, setQuery] = useState(initialQuery);

  const debouncedValue = useDebounce(query.trim(), DELAY);

  const { data, isLoading, error } = superheroApi.useSearchSuperheros({
    query: debouncedValue,
  });

  useEffect(() => {
    if (!debouncedValue) {
      navigate({ pathname: '/', search: '' }, { replace: true });

      return;
    }

    if (debouncedValue === (searchParams.get('hero-name') ?? '')) return;

    navigate(`?hero-name=${encodeURIComponent(debouncedValue)}`, {
      replace: true,
    });
  }, [debouncedValue, navigate, searchParams]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
    []
  );

  return (
    <>
      <h1 className="font-display text-center text-4xl">Superhero Directory</h1>
      <p className="text-center">
        Welcome to the Superhero Directory! Here you can find information about
        your favorite superheroes.
      </p>
      <SearchInput value={query} onChange={handleChange} placeholder={'Search superheroes...'}/>
      <HeroesList data={data} isLoading={isLoading} error={error} />
    </>
  );
}
