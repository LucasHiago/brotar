import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Droplets, FlaskConical, Sun, Leaf, Lightbulb } from 'lucide-react-native';
import { lastReadings, listPlants } from '@/lib/api';
import { evaluate, getSpecies, overallStatus, recommend } from '@/lib/species';
import { statusColor, statusLabel } from '@/lib/status';
import type { MetricEval, Plant, Reading, Recommendation, Species } from '@/lib/types';
import { colors, fontSize, fontWeight, radius, space, shadow } from '@/lib/theme';

const ICON = { umidade: Droplets, ph: FlaskConical, luz: Sun, npk: Leaf };

export default function PlantDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<{
    plant: Plant;
    species: Species;
    evals: MetricEval[];
    recs: Recommendation[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [plants, readings] = await Promise.all([listPlants(), lastReadings()]);
      const plant = plants.find((p) => p.id === id);
      const species = plant ? getSpecies(plant.especieId) : undefined;
      const reading: Reading | undefined = plant ? readings[plant.id] : undefined;
      if (plant && species && reading) {
        setData({
          plant,
          species,
          evals: evaluate(reading, species),
          recs: recommend(reading, species),
        });
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <View style={s.center}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }
  if (!data) {
    return (
      <View style={s.center}>
        <Text style={{ color: colors.textLow }}>Árvore não encontrada.</Text>
      </View>
    );
  }

  const { plant, species, evals, recs } = data;
  const overall = overallStatus(evals);

  return (
    <ScrollView contentContainerStyle={{ padding: space[4], gap: space[4] }}>
      <Stack.Screen options={{ title: plant.apelido }} />

      <View style={s.header}>
        <Text style={s.title}>{plant.apelido}</Text>
        <Text style={s.subtitle}>
          {species.nome_popular}
          {species.nome_cientifico ? ` · ${species.nome_cientifico}` : ''}
        </Text>
        <View style={[s.badge, { borderColor: statusColor(overall) }]}>
          <View style={[s.dot, { backgroundColor: statusColor(overall) }]} />
          <Text style={[s.badgeTxt, { color: statusColor(overall) }]}>{statusLabel(overall)}</Text>
        </View>
      </View>

      <Text style={s.section}>Leituras do sensor</Text>
      {evals.map((m) => {
        const Icon = ICON[m.chave];
        return (
          <View key={m.chave} style={s.metric}>
            <View style={[s.metricIcon, { backgroundColor: colors.surfaceAlt }]}>
              <Icon size={18} color={colors.textMid} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.metricLabel}>{m.rotulo}</Text>
              {!!m.detalhe && <Text style={s.metricDetail}>{m.detalhe}</Text>}
            </View>
            <Text style={s.metricValue}>{m.valor}</Text>
            <View style={[s.dot, { backgroundColor: statusColor(m.status) }]} />
          </View>
        );
      })}

      <Text style={s.section}>O que fazer</Text>
      {recs.length === 0 ? (
        <View style={s.recOk}>
          <Leaf size={18} color={colors.ok} />
          <Text style={s.recOkTxt}>Nada a corrigir agora. {species.nome_popular} está bem.</Text>
        </View>
      ) : (
        recs.map((r, i) => (
          <View key={i} style={[s.rec, { borderLeftColor: statusColor(r.severidade) }]}>
            <Lightbulb size={18} color={statusColor(r.severidade)} />
            <Text style={s.recTxt}>{r.mensagem}</Text>
          </View>
        ))
      )}

      {!!species.calcario && (
        <Text style={s.note}>🪨 Calcário: {species.calcario}</Text>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { gap: space[2] },
  title: { fontSize: fontSize.xl, fontWeight: fontWeight.bold, color: colors.text },
  subtitle: { fontSize: fontSize.sm, color: colors.textLow },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
    borderWidth: 1,
    borderRadius: radius.full,
    paddingVertical: space[1],
    paddingHorizontal: space[3],
    marginTop: space[1],
  },
  badgeTxt: { fontSize: fontSize.sm, fontWeight: fontWeight.semibold },
  section: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.textMid,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: space[2],
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: space[3],
    ...shadow.sm,
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricLabel: { fontSize: fontSize.base, fontWeight: fontWeight.medium, color: colors.text },
  metricDetail: { fontSize: fontSize.xs, color: colors.textLow, marginTop: 1 },
  metricValue: { fontSize: fontSize.base, fontWeight: fontWeight.semibold, color: colors.text },
  dot: { width: 10, height: 10, borderRadius: radius.full },
  rec: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space[3],
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    borderRadius: radius.md,
    padding: space[3],
  },
  recTxt: { flex: 1, fontSize: fontSize.sm, color: colors.textMid, lineHeight: 20 },
  recOk: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    padding: space[3],
  },
  recOkTxt: { flex: 1, fontSize: fontSize.sm, color: colors.primaryDeep },
  note: { fontSize: fontSize.xs, color: colors.textLow, lineHeight: 18, marginTop: space[2] },
});
