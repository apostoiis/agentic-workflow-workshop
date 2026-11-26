import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import type { Speaker } from "@/types/speaker";
import { Flex, Grid } from "@chakra-ui/react";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function SpeakersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("SpeakersPage");

  // Placeholder until the data integration step wires in fetchSessions().
  const speakers: Speaker[] = [];

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      <PageHeading title={t("title")}>{t("subtitle")}</PageHeading>

      <Grid
        gap="4"
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
      >
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.name} speaker={speaker} />
        ))}
      </Grid>
    </Flex>
  );
}
