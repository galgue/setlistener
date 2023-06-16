export const RouteBuilder = () => {
  let path = "";
  const searchParams = new URLSearchParams();
  const builder = {
    path(pathToAdd: string) {
      path = path + pathToAdd;
      return builder;
    },
    query(query: string) {
      path = path + encodeURIComponent(query);
      return builder;
    },
    searchParam(key: string, value: string | number | boolean | undefined) {
      if (value === undefined) return builder;
      searchParams.append(key, value.toString());
      return builder;
    },
    build() {
      return path + "?" + searchParams.toString();
    },
  };
  return builder;
};
