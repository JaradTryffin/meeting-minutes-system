import { Heading } from "@/components/Heading";

export default async function MeetingItemPerMeetingPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="m-5">
      <div className="mb-5">
        <Heading
          title="Meeting Items xxxxxx"
          description="Manage meeting items"
        />
      </div>
      <h1>{params.id}</h1>
    </div>
  );
}
