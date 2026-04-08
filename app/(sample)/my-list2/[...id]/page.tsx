const CurrentPage = async ({ params }: { params: { id: string[] } }) => {
  return (
    <div>
      <h1>ID: {params.id?.join('/')}</h1>
    </div>
  );
};

export default CurrentPage;
