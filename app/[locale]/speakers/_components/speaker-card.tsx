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
        <Flex as="ul" direction="column" gap="3" listStyleType="none">
          {speaker.sessions.map((session) => (
            <Box as="li" key={session.id}>
              <Link href={`/sessions/${session.id}`}>
                <Box
                  as="span"
                  display="block"
                  fontSize="sm"
                  transition="color 0.2s"
                  _hover={{ color: "var(--accent-hex)" }}
                >
                  <Text as="span" display="block" color="var(--text-muted)">
                    {session.startTime}
                  </Text>
                  {session.title}
                </Box>
              </Link>
            </Box>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
