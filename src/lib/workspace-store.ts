import { useSyncExternalStore } from "react";

export type ClientKind = "Private" | "Business";

export type WorkspaceClient = {
  id: string;
  kind?: ClientKind;
  name: string;
  surname?: string;
  address: string;
  phone: string;
  email: string;
  taxNumber?: string;
  projects: string;
  updatedAt: string;
};

export type FirmRole = "Executor" | "Customer";
export type FirmStatus = "Active" | "Linked";

export type WorkspaceFirm = {
  id: string;
  name: string;
  role: FirmRole;
  status: FirmStatus;
  workers: string;
  projects: string;
  paymentPath: string;
  updatedAt: string;
};

export type ProjectStatus = "Draft" | "Ready" | "Active" | "Archive";

export type WorkspaceProject = {
  id: string;
  name: string;
  direction: string;
  status: ProjectStatus;
  client: string;
  startDate: string;
  subcontractors: string[];
  note: string;
  updatedAt: string;
};

export type CalendarStatus = "Today" | "Tomorrow" | "Next week" | "Waiting";

export type WorkspaceCalendarItem = {
  id: string;
  name: string;
  direction: string;
  startDate: string;
  status: CalendarStatus;
  note: string;
  updatedAt: string;
};

export type WorkspaceFinance = {
  id: string;
  project: string;
  totalCost: string;
  profit: string;
  subcontractor: string;
  note: string;
  updatedAt: string;
};

export type DocumentScope = "Project" | "Subcontractor" | "Linked";

export type WorkspaceDocument = {
  id: string;
  title: string;
  scope: DocumentScope;
  version: string;
  note: string;
  updatedAt: string;
};

export type WorkspaceReport = {
  id: string;
  title: string;
  photoCount: string;
  note: string;
  updatedAt: string;
};

export type WorkspaceArchiveItem = {
  id: string;
  title: string;
  year: string;
  client: string;
  direction: string;
  note: string;
  updatedAt: string;
};

export type WorkspaceState = {
  clients: WorkspaceClient[];
  firms: WorkspaceFirm[];
  projects: WorkspaceProject[];
  calendar: WorkspaceCalendarItem[];
  finances: WorkspaceFinance[];
  documents: WorkspaceDocument[];
  reports: WorkspaceReport[];
  archive: WorkspaceArchiveItem[];
};

const STORAGE_KEY = "vt-tracker:workspace";
const CHANGE_EVENT = "vt-tracker-workspace-change";

const now = "28.05.2026 00:00";

function createId(prefix: string, index: number): string {
  return `${prefix}-${String(index + 1).padStart(2, "0")}`;
}

export function createWorkspaceId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function parseWorkspaceDate(value: string): Date | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const dmyMatch = trimmed.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);
  if (dmyMatch) {
    const day = Number(dmyMatch[1]);
    const month = Number(dmyMatch[2]) - 1;
    const year = Number(dmyMatch[3]);
    const parsed = new Date(year, month, day);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  const ymdMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (ymdMatch) {
    const year = Number(ymdMatch[1]);
    const month = Number(ymdMatch[2]) - 1;
    const day = Number(ymdMatch[3]);
    const parsed = new Date(year, month, day);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  return null;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isProjectCalendarVisible(project: WorkspaceProject): boolean {
  return project.status !== "Archive" && parseWorkspaceDate(project.startDate) !== null;
}

export function deriveCalendarStatus(startDate: string): CalendarStatus {
  const parsedStart = parseWorkspaceDate(startDate);
  if (!parsedStart) {
    return "Waiting";
  }

  const today = startOfDay(new Date());
  const target = startOfDay(parsedStart);
  const diffDays = Math.round((target.getTime() - today.getTime()) / 86400000);

  if (diffDays <= 0) {
    return "Today";
  }

  if (diffDays === 1) {
    return "Tomorrow";
  }

  if (diffDays <= 7) {
    return "Next week";
  }

  return "Waiting";
}

export function buildCalendarItemsFromProjects(
  projects: WorkspaceProject[],
  currentCalendar: WorkspaceCalendarItem[] = [],
): WorkspaceCalendarItem[] {
  const existingById = new Map(currentCalendar.map((item) => [item.id, item]));

  return projects
    .filter(isProjectCalendarVisible)
    .map((project) => {
      const existing = existingById.get(project.id);

      return {
        id: project.id,
        name: project.name,
        direction: project.direction,
        startDate: project.startDate,
        status: deriveCalendarStatus(project.startDate),
        note: existing?.note || project.note,
        updatedAt: existing?.updatedAt || project.updatedAt,
      };
    })
    .sort((left, right) => {
      const leftDate = parseWorkspaceDate(left.startDate)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      const rightDate = parseWorkspaceDate(right.startDate)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      return leftDate - rightDate;
    });
}

export function syncCalendarFromProjects(workspace: WorkspaceState): WorkspaceState {
  return {
    ...workspace,
    calendar: buildCalendarItemsFromProjects(workspace.projects, workspace.calendar),
  };
}

function normalizeCollection<T extends { id?: string }>(items: T[] | undefined, prefix: string): T[] | undefined {
  if (!items) {
    return undefined;
  }

  return items.map((item, index) => ({
    ...item,
    id: item.id || createId(prefix, index),
  }));
}

const defaultWorkspace: WorkspaceState = {
  clients: [
    {
      id: createId("client", 0),
      name: "Семья Брауэрс",
      surname: "Брауэрс",
      address: "Антверпен, Бельгия",
      phone: "+32 470 11 22 33",
      email: "brouwers@example.com",
      projects: "2",
      updatedAt: now,
    },
    {
      id: createId("client", 1),
      name: "Ван Дейк Недвижимость",
      address: "Гент, Бельгия",
      phone: "+32 470 44 55 66",
      email: "contact@vandijkproperties.be",
      projects: "4",
      updatedAt: now,
    },
    {
      id: createId("client", 2),
      name: "Резиденция Мертенс",
      surname: "Мертенс",
      address: "Брюгге, Бельгия",
      phone: "+32 470 77 88 99",
      email: "mertens@example.com",
      projects: "1",
      updatedAt: now,
    },
    {
      id: createId("client", 3),
      name: "Группа Де Смет",
      address: "Лёвен, Бельгия",
      phone: "+32 470 12 34 56",
      email: "office@desmetgroup.be",
      projects: "3",
      updatedAt: now,
    },
  ],
  firms: [
    {
      id: createId("firm", 0),
      name: "Кровля Плюс",
      role: "Executor",
      status: "Active",
      workers: "6",
      projects: "4",
      paymentPath: "Оплата проходит через расходы проекта",
      updatedAt: now,
    },
    {
      id: createId("firm", 1),
      name: "Подъем-Скай",
      role: "Executor",
      status: "Linked",
      workers: "3",
      projects: "2",
      paymentPath: "Привязана к одному текущему проекту",
      updatedAt: now,
    },
    {
      id: createId("firm", 2),
      name: "Городской мастер",
      role: "Executor",
      status: "Active",
      workers: "5",
      projects: "3",
      paymentPath: "Оплата проходит через расходы проекта",
      updatedAt: now,
    },
    {
      id: createId("firm", 3),
      name: "КаркасПлюс",
      role: "Customer",
      status: "Active",
      workers: "4",
      projects: "1",
      paymentPath: "Использует поток расходов проекта",
      updatedAt: now,
    },
  ],
  projects: [
    {
      id: createId("project", 0),
      name: "Ремонт северной крыши",
      direction: "Крыша",
      status: "Active",
      client: "Семья Брауэрс",
      startDate: "27.05.2026",
      subcontractors: ["Кровля Плюс", "Северный лес"],
      note: "Дата старта синхронизирована с календарем, открыт отчет о ходе работ.",
      updatedAt: now,
    },
    {
      id: createId("project", 1),
      name: "Ремонт фасада в Брюсселе",
      direction: "Фасад",
      status: "Ready",
      client: "Van Dijk Properties",
      startDate: "В ожидании",
      subcontractors: ["Стальной фикс", "СкайЛифт"],
      note: "Смета одобрена, ждем финальную дату старта.",
      updatedAt: now,
    },
    {
      id: createId("project", 2),
      name: "Отделка лофта",
      direction: "Интерьер",
      status: "Draft",
      client: "Резиденция Мертенс",
      startDate: "12.06.2026",
      subcontractors: ["Городской мастер"],
      note: "Список материалов и архив документов уже привязаны.",
      updatedAt: now,
    },
    {
      id: createId("project", 3),
      name: "Строительство каркаса дома",
      direction: "Общее строительство",
      status: "Archive",
      client: "Группа Де Смет",
      startDate: "Закрыт",
      subcontractors: ["Каркас", "Бетон Плюс"],
      note: "Заархивирован как полностью закрытый проект с сохраненной историей версий.",
      updatedAt: now,
    },
  ],
  calendar: [
    {
      id: createId("calendar", 0),
      name: "Ремонт северной крыши",
      direction: "Крыша",
      startDate: "27.05.2026",
      status: "Today",
      note: "Активный проект с синхронизированной датой старта и готовым отчетом.",
      updatedAt: now,
    },
    {
      id: createId("calendar", 1),
      name: "Ремонт фасада в Брюсселе",
      direction: "Фасад",
      startDate: "28.05.2026",
      status: "Tomorrow",
      note: "Проект уже готов к запуску и ждет наступления стартовой даты.",
      updatedAt: now,
    },
    {
      id: createId("calendar", 2),
      name: "Отделка лофта",
      direction: "Интерьер",
      startDate: "03.06.2026",
      status: "Next week",
      note: "Проект с выбранной датой старта, который уже виден в календаре.",
      updatedAt: now,
    },
  ],
  finances: [
    {
      id: createId("finance", 0),
      project: "Ремонт северной крыши",
      totalCost: "€128k",
      profit: "€34k",
      subcontractor: "Кровля Плюс",
      note: "Общие расходы по проекту и итог уже сведены в один поток.",
      updatedAt: now,
    },
    {
      id: createId("finance", 1),
      project: "Ремонт фасада в Брюсселе",
      totalCost: "€96k",
      profit: "€22k",
      subcontractor: "Стальной фикс",
      note: "Здесь видны текущие расходы, которые идут через проект.",
      updatedAt: now,
    },
    {
      id: createId("finance", 2),
      project: "Отделка лофта",
      totalCost: "€74k",
      profit: "€18k",
      subcontractor: "Городской мастер",
      note: "Дополнительные расходы и прибыль сведены в единую финансовую строку.",
      updatedAt: now,
    },
  ],
  documents: [
    {
      id: createId("document", 0),
      title: "Смета проекта",
      scope: "Project",
      version: "v1.0",
      note: "Запись с контекстом проекта и номером версии.",
      updatedAt: now,
    },
    {
      id: createId("document", 1),
      title: "Запись субподрядчика",
      scope: "Subcontractor",
      version: "v2.1",
      note: "Запись с контекстом субподрядчика и заметкой.",
      updatedAt: now,
    },
    {
      id: createId("document", 2),
      title: "Связанная запись",
      scope: "Linked",
      version: "v1.3",
      note: "Отдельный контекст для связанных документов.",
      updatedAt: now,
    },
  ],
  reports: [
    {
      id: createId("report", 0),
      title: "Ход крыши",
      photoCount: "8",
      note: "Обновление с фото и короткими полевыми заметками.",
      updatedAt: now,
    },
    {
      id: createId("report", 1),
      title: "Этап фасада",
      photoCount: "5",
      note: "Видны дата создания и история изменений.",
      updatedAt: now,
    },
    {
      id: createId("report", 2),
      title: "Завершение интерьера",
      photoCount: "12",
      note: "Финальный отчет, готовый для архива.",
      updatedAt: now,
    },
  ],
  archive: [
    {
      id: createId("archive", 0),
      title: "Строительство каркаса дома",
      year: "2025",
      client: "Группа Де Смет",
      direction: "Общее строительство",
      note: "Закрытый проект с полностью сохраненной историей и готовым поиском по клиенту.",
      updatedAt: now,
    },
    {
      id: createId("archive", 1),
      title: "Ремонт северной крыши",
      year: "2026",
      client: "Семья Брауэрс",
      direction: "Крыша",
      note: "Готов к возврату, если работа должна продолжиться в том же проекте.",
      updatedAt: now,
    },
    {
      id: createId("archive", 2),
      title: "Ремонт фасада в Брюсселе",
      year: "2026",
      client: "Van Dijk Properties",
      direction: "Фасад",
      note: "Архивная строка для поиска по месяцу, разделу и клиенту.",
      updatedAt: now,
    },
    {
      id: createId("archive", 3),
      title: "Отделка лофта",
      year: "2026",
      client: "Резиденция Мертенс",
      direction: "Интерьер",
      note: "Сохраненный проект, который можно быстро открыть по направлению работ.",
      updatedAt: now,
    },
  ],
};

const listeners = new Set<() => void>();
let cachedWorkspace: WorkspaceState | null = null;
let storageListenerAttached = false;

function notifyWorkspaceChange() {
  cachedWorkspace = null;
  for (const listener of listeners) {
    listener();
  }
}

function attachStorageListener() {
  if (typeof window === "undefined" || storageListenerAttached) {
    return;
  }

  window.addEventListener("storage", notifyWorkspaceChange);
  window.addEventListener(CHANGE_EVENT, notifyWorkspaceChange);
  storageListenerAttached = true;
}

function mergeWorkspace(partial: Partial<WorkspaceState>): WorkspaceState {
  return {
    clients: normalizeCollection(partial.clients, "client") ?? defaultWorkspace.clients,
    firms: normalizeCollection(partial.firms, "firm") ?? defaultWorkspace.firms,
    projects: normalizeCollection(partial.projects, "project") ?? defaultWorkspace.projects,
    calendar: normalizeCollection(partial.calendar, "calendar") ?? defaultWorkspace.calendar,
    finances: normalizeCollection(partial.finances, "finance") ?? defaultWorkspace.finances,
    documents: normalizeCollection(partial.documents, "document") ?? defaultWorkspace.documents,
    reports: normalizeCollection(partial.reports, "report") ?? defaultWorkspace.reports,
    archive: normalizeCollection(partial.archive, "archive") ?? defaultWorkspace.archive,
  };
}

function readLegacyArray<T>(key: string): T[] | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : null;
  } catch {
    return null;
  }
}

function readLegacyWorkspace(): Partial<WorkspaceState> {
  return {
    clients: readLegacyArray<WorkspaceClient>("vt-tracker:clients") ?? undefined,
    firms: readLegacyArray<WorkspaceFirm>("vt-tracker:firms") ?? undefined,
    projects: readLegacyArray<WorkspaceProject>("vt-tracker:projects") ?? undefined,
    calendar: readLegacyArray<WorkspaceCalendarItem>("vt-tracker:calendar") ?? undefined,
    finances: readLegacyArray<WorkspaceFinance>("vt-tracker:finances") ?? undefined,
    documents: readLegacyArray<WorkspaceDocument>("vt-tracker:documents") ?? undefined,
    reports: readLegacyArray<WorkspaceReport>("vt-tracker:reports") ?? undefined,
    archive: readLegacyArray<WorkspaceArchiveItem>("vt-tracker:archive") ?? undefined,
  };
}

function readWorkspaceFromStorage(): WorkspaceState {
  if (typeof window === "undefined") {
    return defaultWorkspace;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return mergeWorkspace(JSON.parse(raw) as Partial<WorkspaceState>);
    } catch {
      return defaultWorkspace;
    }
  }

  const legacy = readLegacyWorkspace();
  const hasLegacyData = Object.values(legacy).some((value) => Array.isArray(value) && value.length > 0);
  const merged = hasLegacyData ? mergeWorkspace(legacy) : defaultWorkspace;

  return merged;
}

export function getWorkspaceSnapshot(): WorkspaceState {
  if (cachedWorkspace) {
    return cachedWorkspace;
  }

  cachedWorkspace = readWorkspaceFromStorage();
  return cachedWorkspace;
}

export function writeWorkspace(nextWorkspace: WorkspaceState): void {
  cachedWorkspace = nextWorkspace;

  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextWorkspace));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function updateWorkspace(updater: (current: WorkspaceState) => WorkspaceState): void {
  writeWorkspace(updater(getWorkspaceSnapshot()));
}

export function updateWorkspaceSlice<K extends keyof WorkspaceState>(
  slice: K,
  updater: (current: WorkspaceState[K]) => WorkspaceState[K],
): void {
  updateWorkspace((current) => ({
    ...current,
    [slice]: updater(current[slice]),
  }));
}

export function clearWorkspaceSlice<K extends keyof WorkspaceState>(slice: K): void {
  updateWorkspace((current) => ({
    ...current,
    [slice]: [],
  }));
}

export function useWorkspaceSelector<T>(selector: (workspace: WorkspaceState) => T): T {
  return useSyncExternalStore(
    (listener) => {
      attachStorageListener();
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    () => selector(getWorkspaceSnapshot()),
    () => selector(defaultWorkspace),
  );
}
