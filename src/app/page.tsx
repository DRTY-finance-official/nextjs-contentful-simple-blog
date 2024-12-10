/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.SPACE_ID as string,
  accessToken: process.env.ACCESS_TOKEN as string,
});

const getBlogEntries = async () => {
  const entries = await client.getEntries({ content_type: 'blog' });
  return entries;
};

export default async function Home() {
  const blogEntries = await getBlogEntries();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {blogEntries.items.map((singlePost) => {
        const { slug, title, date } = singlePost.fields;
        return (
          <div>
              <h2>{title}</h2>
              <span>
                Posted on{" "}
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
          </div>
        );
      })}
    </main>
  );
}
