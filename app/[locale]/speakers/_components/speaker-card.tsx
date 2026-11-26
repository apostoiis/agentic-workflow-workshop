import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Speaker } from "@/types/speaker";
import { Box, Flex, Text } from "@chakra-ui/react";

export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <Card height="full">
      <CardHeader>
        <CardTitle as="h2" fontSize="md">
          {speaker.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Safari can drop list semantics when list-style is none. */}
        <Flex
          as="ul"
          role="list"
          direction="column"
          gap="3"
          listStyleType="none"
        >
          {speaker.sessions.map((session) => (
            <Box as="li" key={session.id}>
              <Link href={`/sessions/${session.id}`}>
                <Box
                  as="span"
                  display="block"
                  fontSize="sm"
                  _hover={{ textDecoration: "underline" }}
                >
                  <Text as="span" display="block" color="var(--text-secondary)">
                    {session.startTime}
                  </Text>
                  {/* Titles come from the database in English only. */}
                  <Box as="span" lang="en">
                    {session.title}
                  </Box>
                </Box>
              </Link>
            </Box>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
