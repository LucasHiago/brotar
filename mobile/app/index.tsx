import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Sprout, ChevronRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { lastReadings, listPlants } from '@/lib/api';
import { evaluate, getSpecies, overallStatus } from '@/lib/species';
import { statusColor, statusLabel } from '@/lib/status';
import type { Plant, Reading, Status } from '@/lib/types';
import { colors, fontSize, fontWeight, radius, space, shadow } from '@/lib/theme';

interface Row {
  plant: Plant;
  especie: string;
  status: Status;
}

export default function PlantsScreen() {
  const insets = useSafeAreaInsets();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [plants, readings] = await Promise.all([listPlants(), lastReadings()]);
      setRows(plants.map((p) => buildRow(p, readings[p.id])));
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={s.center}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ padding: space[4], paddingBottom: insets.bottom + space[6] }}
      data={rows}
      keyExtractor={(r) => r.plant.id}
      ItemSeparatorComponent={() => <View style={{ height: space[3] }} />}
      renderItem={({ item }) => (
        <Pressable style={s.card} onPress={() => router.push(`/plant/${item.plant.id}`)}>
          <View style={[s.iconWrap, { backgroundColor: colors.primarySoft }]}>
            <Sprout size={22} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.apelido}>{item.plant.apelido}</Text>
            <Text style={s.especie}>
              {item.especie}
              {item.plant.local ? ` · ${item.plant.local}` : ''}
            </Text>
          </View>
          <View style={s.statusWrap}>
            <View style={[s.dot, { backgroundColor: statusColor(item.status) }]} />
            <Text style={[s.statusTxt, { color: statusColor(item.status) }]}>
              {statusLabel(item.status)}
            </Text>
          </View>
          <ChevronRight size={18} color={colors.textFaint} />
        </Pressable>
      )}
    />
  );
}

function buildRow(plant: Plant, reading?: Reading): Row {
  const especie = getSpecies(plant.especieId);
  const status: Status =
    especie && reading ? overallStatus(evaluate(reading, especie)) : 'ok';
  return { plant, especie: especie?.nome_popular ?? plant.especieId, status };
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
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
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  apelido: { fontSize: fontSize.base, fontWeight: fontWeight.semibold, color: colors.text },
  especie: { fontSize: fontSize.sm, color: colors.textLow, marginTop: 2 },
  statusWrap: { flexDirection: 'row', alignItems: 'center', gap: space[1] },
  dot: { width: 9, height: 9, borderRadius: radius.full },
  statusTxt: { fontSize: fontSize.xs, fontWeight: fontWeight.semibold },
});
