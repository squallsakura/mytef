/**
 * 法语词汇数据
 * 包含常用法语词汇、动词变位和例句
 */

import { Card } from '../lib/sm2';

export interface VerbConjugation {
  // 现在时
  je: string;
  tu: string;
  il: string;
  elle: string;
  nous: string;
  vous: string;
  ils: string;
  elles: string;
  
  // 未完成过去时
  jeImparfait: string;
  nousImparfait: string;
  
  // 简单过去时
  jePasseSimple: string;
  nousPasseSimple: string;
  
  // 将来时
  jeFutur: string;
  nousFutur: string;
  
  // 虚拟式
  jeSubjonctif: string;
  nousSubjonctif: string;
  
  // 条件式
  jeConditionnel: string;
  nousConditionnel: string;
  
  // 命令式
  tuCommander: string;
  nousCommander: string;
}

export interface VocabularyItem {
  id: string;
  french: string;
  english: string;
  chinese: string;
  phonetic?: string;
  category: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'expression';
  gender?: 'masculin' | 'feminin';
  plural?: string;
  example?: string;
  exampleTranslation?: string;
  verbGroup?: 'er' | 'ir' | 're' | 'irregular';
  conjugations?: VerbConjugation;
  frequency: number; // 1-100, 越高越常用
}

// 法语动词变位数据
export const verbConjugations: Record<string, VerbConjugation> = {
  'travailler': {
    je: 'travaille', tu: 'travailles', il: 'travaille', elle: 'travaille',
    nous: 'travaillons', vous: 'travaillez', ils: 'travaillent', elles: 'travaillent',
    jeImparfait: 'travaillais', nousImparfait: 'travaillions',
    jePasseSimple: 'travaillai', nousPasseSimple: 'travaillâmes',
    jeFutur: 'travaillerai', nousFutur: 'travaillerons',
    jeSubjonctif: 'travaille', nousSubjonctif: 'travaillions',
    jeConditionnel: 'travaillerais', nousConditionnel: 'travaillerions',
    tuCommander: 'travaille!', nousCommander: 'travaillons!'
  },
  'être': {
    je: 'suis', tu: 'es', il: 'est', elle: 'est',
    nous: 'sommes', vous: 'êtes', ils: 'sont', elles: 'sont',
    jeImparfait: 'étais', nousImparfait: 'étions',
    jePasseSimple: 'fus', nousPasseSimple: 'fûmes',
    jeFutur: 'serai', nousFutur: 'serons',
    jeSubjonctif: 'sois', nousSubjonctif: 'soyons',
    jeConditionnel: 'serais', nousConditionnel: 'serions',
    tuCommander: 'sois!', nousCommander: 'soyons!'
  },
  'avoir': {
    je: 'ai', tu: 'as', il: 'a', elle: 'a',
    nous: 'avons', vous: 'avez', ils: 'ont', elles: 'ont',
    jeImparfait: 'avais', nousImparfait: 'avions',
    jePasseSimple: 'eus', nousPasseSimple: 'eûmes',
    jeFutur: 'aurai', nousFutur: 'aurons',
    jeSubjonctif: 'aie', nousSubjonctif: 'ayons',
    jeConditionnel: 'aurais', nousConditionnel: 'aurions',
    tuCommander: 'aie!', nousCommander: 'ayons!'
  },
  'aller': {
    je: 'vais', tu: 'vas', il: 'va', elle: 'va',
    nous: 'allons', vous: 'allez', ils: 'vont', elles: 'vont',
    jeImparfait: 'allais', nousImparfait: 'allions',
    jePasseSimple: 'allai', nousPasseSimple: 'allâmes',
    jeFutur: 'irai', nousFutur: 'irons',
    jeSubjonctif: 'aille', nousSubjonctif: 'allions',
    jeConditionnel: 'irais', nousConditionnel: 'irions',
    tuCommander: 'va!', nousCommander: 'allons!'
  },
  'venir': {
    je: 'viens', tu: 'viens', il: 'vient', elle: 'vient',
    nous: 'venons', vous: 'venez', ils: 'viennent', elles: 'viennent',
    jeImparfait: 'venais', nousImparfait: 'venions',
    jePasseSimple: 'vins', nousPasseSimple: 'vînmes',
    jeFutur: 'viendrai', nousFutur: 'viendrons',
    jeSubjonctif: 'vienne', nousSubjonctif: 'venions',
    jeConditionnel: 'viendrais', nousConditionnel: 'viendrions',
    tuCommander: 'viens!', nousCommander: 'venons!'
  },
  'faire': {
    je: 'fais', tu: 'fais', il: 'fait', elle: 'fait',
    nous: 'faisons', vous: 'faites', ils: 'font', elles: 'font',
    jeImparfait: 'faisais', nousImparfait: 'faisions',
    jePasseSimple: 'fis', nousPasseSimple: 'fîmes',
    jeFutur: 'ferai', nousFutur: 'ferons',
    jeSubjonctif: 'fasse', nousSubjonctif: 'fassions',
    jeConditionnel: 'ferais', nousConditionnel: 'ferions',
    tuCommander: 'fais!', nousCommander: 'faisons!'
  },
  'pouvoir': {
    je: 'peux', tu: 'peux', il: 'peut', elle: 'peut',
    nous: 'pouvons', vous: 'pouvez', ils: 'peuvent', elles: 'peuvent',
    jeImparfait: 'pouvais', nousImparfait: 'pouvions',
    jePasseSimple: 'pus', nousPasseSimple: 'pûmes',
    jeFutur: 'pourrai', nousFutur: 'pourrons',
    jeSubjonctif: 'puisse', nousSubjonctif: 'puissions',
    jeConditionnel: 'pourrais', nousConditionnel: 'pourrions',
    tuCommander: 'puis!', nousCommander: 'pouvons!'
  },
  'vouloir': {
    je: 'veux', tu: 'veux', il: 'veut', elle: 'veut',
    nous: 'voulons', vous: 'voulez', ils: 'veulent', elles: 'veulent',
    jeImparfait: 'voulais', nousImparfait: 'voulions',
    jePasseSimple: 'voulus', nousPasseSimple: 'voulûmes',
    jeFutur: 'voudrai', nousFutur: 'voudrons',
    jeSubjonctif: 'veuille', nousSubjonctif: 'voulions',
    jeConditionnel: 'voudrais', nousConditionnel: 'voudrions',
    tuCommander: 'veux!', nousCommander: 'voulons!'
  },
  'devoir': {
    je: 'dois', tu: 'dois', il: 'doit', elle: 'doit',
    nous: 'devons', vous: 'devez', ils: 'doivent', elles: 'doivent',
    jeImparfait: 'devais', nousImparfait: 'devions',
    jePasseSimple: 'dus', nousPasseSimple: 'dûmes',
    jeFutur: 'devrai', nousFutur: 'devrons',
    jeSubjonctif: 'doive', nousSubjonctif: 'devions',
    jeConditionnel: 'devrais', nousConditionnel: 'devripons',
    tuCommander: 'dois!', nousCommander: 'devons!'
  },
  'prendre': {
    je: 'prends', tu: 'prends', il: 'prend', elle: 'prend',
    nous: 'prenons', vous: 'prenez', ils: 'prennent', elles: 'prennent',
    jeImparfait: 'prenais', nousImparfait: 'prenions',
    jePasseSimple: 'pris', nousPasseSimple: 'prîmes',
    jeFutur: 'prendrai', nousFutur: 'prendrons',
    jeSubjonctif: 'prenne', nousSubjonctif: 'prenions',
    jeConditionnel: 'prendrais', nousConditionnel: 'prendrion',
    tuCommander: 'prends!', nousCommander: 'prenons!'
  }
};

// 核心法语词汇（TEF常用）
export const vocabularyData: VocabularyItem[] = [
  // 最常用动词 (1-20)
  { id: 'v1', french: 'être', english: 'to be', chinese: '是', category: 'verb', verbGroup: 'irregular', conjugations: verbConjugations['être'], frequency: 100 },
  { id: 'v2', french: 'avoir', english: 'to have', chinese: '有', category: 'verb', verbGroup: 'irregular', conjugations: verbConjugations['avoir'], frequency: 99 },
  { id: 'v3', french: 'faire', english: 'to do/make', chinese: '做', category: 'verb', verbGroup: 'irregular', conjugations: verbConjugations['faire'], frequency: 98 },
  { id: 'v4', french: 'pouvoir', english: 'to be able to', chinese: '能', category: 'verb', verbGroup: 'irregular', conjugations: verbConjugations['pouvoir'], frequency: 97 },
  { id: 'v5', french: 'vouloir', english: 'to want', chinese: '想要', category: 'verb', verbGroup: 'irregular', conjugations: verbConjugations['vouloir'], frequency: 96 },
  { id: 'v6', french: 'devoir', english: 'to must/have to', chinese: '应该', category: 'verb', verbGroup: 'irregular', conjugations: verbConjugations['devoir'], frequency: 95 },
  { id: 'v7', french: 'aller', english: 'to go', chinese: '去', category: 'verb', verbGroup: 'irregular', conjugations: verbConjugations['aller'], frequency: 94 },
  { id: 'v8', french: 'venir', english: 'to come', chinese: '来', category: 'verb', verbGroup: 'irregular', conjugations: verbConjugations['venir'], frequency: 93 },
  { id: 'v9', french: 'voir', english: 'to see', chinese: '看', category: 'verb', verbGroup: 're', frequency: 92 },
  { id: 'v10', french: 'prendre', english: 'to take', chinese: '拿', category: 'verb', verbGroup: 'irregular', conjugations: verbConjugations['prendre'], frequency: 91 },
  { id: 'v11', french: 'donner', english: 'to give', chinese: '给', category: 'verb', verbGroup: 'er', frequency: 90 },
  { id: 'v12', french: 'dire', english: 'to say', chinese: '说', category: 'verb', verbGroup: 'irregular', frequency: 89 },
  { id: 'v13', french: 'parler', english: 'to speak', chinese: '说话', category: 'verb', verbGroup: 'er', frequency: 88 },
  { id: 'v14', french: 'mettre', english: 'to put', chinese: '放', category: 'verb', verbGroup: 're', frequency: 87 },
  { id: 'v15', french: 'savoir', english: 'to know', chinese: '知道', category: 'verb', verbGroup: 'irregular', frequency: 86 },
  { id: 'v16', french: 'croire', english: 'to believe', chinese: '相信', category: 'verb', verbGroup: 'irregular', frequency: 85 },
  { id: 'v17', french: 'comprendre', english: 'to understand', chinese: '理解', category: 'verb', verbGroup: 're', frequency: 84 },
  { id: 'v18', french: 'recevoir', english: 'to receive', chinese: '收到', category: 'verb', verbGroup: 'irregular', frequency: 83 },
  { id: 'v19', french: 'perdre', english: 'to lose', chinese: '失去', category: 'verb', verbGroup: 're', frequency: 82 },
  { id: 'v20', french: 'travailler', english: 'to work', chinese: '工作', category: 'verb', verbGroup: 'er', conjugations: verbConjugations['travailler'], frequency: 81 },
  
  // 常用名词 (21-50)
  { id: 'n1', french: 'homme', english: 'man', chinese: '男人', category: 'noun', gender: 'masculin', plural: 'hommes', frequency: 80 },
  { id: 'n2', french: 'femme', english: 'woman', chinese: '女人', category: 'noun', gender: 'feminin', plural: 'femmes', frequency: 79 },
  { id: 'n3', french: 'enfant', english: 'child', chinese: '孩子', category: 'noun', gender: 'masculin', plural: 'enfants', frequency: 78 },
  { id: 'n4', french: 'maison', english: 'house', chinese: '房子', category: 'noun', gender: 'feminin', plural: 'maisons', frequency: 77 },
  { id: 'n5', french: 'temps', english: 'time/weather', chinese: '时间/天气', category: 'noun', gender: 'masculin', frequency: 76 },
  { id: 'n6', french: 'main', english: 'hand', chinese: '手', category: 'noun', gender: 'feminin', plural: 'mains', frequency: 75 },
  { id: 'n7', french: 'yeux', english: 'eyes', chinese: '眼睛', category: 'noun', gender: 'masculin', frequency: 74 },
  { id: 'n8', french: 'pied', english: 'foot', chinese: '脚', category: 'noun', gender: 'masculin', plural: 'pieds', frequency: 73 },
  { id: 'n9', french: 'jour', english: 'day', chinese: '天', category: 'noun', gender: 'masculin', plural: 'jours', frequency: 72 },
  { id: 'n10', french: 'année', english: 'year', chinese: '年', category: 'noun', gender: 'feminin', plural: 'années', frequency: 71 },
  { id: 'n11', french: 'semaine', english: 'week', chinese: '周', category: 'noun', gender: 'feminin', plural: 'semaines', frequency: 70 },
  { id: 'n12', french: 'mois', english: 'month', chinese: '月', category: 'noun', gender: 'masculin', frequency: 69 },
  { id: 'n13', french: 'heure', english: 'hour/time', chinese: '小时', category: 'noun', gender: 'feminin', plural: 'heures', frequency: 68 },
  { id: 'n14', french: 'minute', english: 'minute', chinese: '分钟', category: 'noun', gender: 'feminin', plural: 'minutes', frequency: 67 },
  { id: 'n15', french: 'ami', english: 'friend', chinese: '朋友', category: 'noun', gender: 'masculin', plural: 'amis', frequency: 66 },
  { id: 'n16', french: 'famille', english: 'family', chinese: '家庭', category: 'noun', gender: 'feminin', frequency: 65 },
  { id: 'n17', french: 'travail', english: 'work', chinese: '工作', category: 'noun', gender: 'masculin', plural: 'travaux', frequency: 64 },
  { id: 'n18', french: 'école', english: 'school', chinese: '学校', category: 'noun', gender: 'feminin', frequency: 63 },
  { id: 'n19', french: 'ville', english: 'city', chinese: '城市', category: 'noun', gender: 'feminin', frequency: 62 },
  { id: 'n20', french: 'pays', english: 'country', chinese: '国家', category: 'noun', gender: 'masculin', frequency: 61 },
  
  // 常用形容词 (51-70)
  { id: 'a1', french: 'grand', english: 'big/tall', chinese: '大的', category: 'adjective', gender: 'masculin', frequency: 60 },
  { id: 'a2', french: 'petit', english: 'small', chinese: '小的', category: 'adjective', gender: 'masculin', frequency: 59 },
  { id: 'a3', french: 'bon', english: 'good', chinese: '好的', category: 'adjective', gender: 'masculin', frequency: 58 },
  { id: 'a4', french: 'nouveau', english: 'new', chinese: '新的', category: 'adjective', gender: 'masculin', frequency: 57 },
  { id: 'a5', french: 'jeune', english: 'young', chinese: '年轻的', category: 'adjective', frequency: 56 },
  { id: 'a6', french: 'beau', english: 'beautiful', chinese: '美丽的', category: 'adjective', frequency: 55 },
  { id: 'a7', french: 'important', english: 'important', chinese: '重要的', category: 'adjective', frequency: 54 },
  { id: 'a8', french: 'possible', english: 'possible', chinese: '可能的', category: 'adjective', frequency: 53 },
  { id: 'a9', french: 'différent', english: 'different', chinese: '不同的', category: 'adjective', frequency: 52 },
  { id: 'a10', french: 'premier', english: 'first', chinese: '第一的', category: 'adjective', frequency: 51 },
  
  // 常用表达 (71-100)
  { id: 'e1', french: 'je ne comprends pas', english: "I don't understand", chinese: '我不明白', category: 'expression', frequency: 50 },
  { id: 'e2', french: "s'il vous plaît", english: 'please', chinese: '请', category: 'expression', frequency: 49 },
  { id: 'e3', french: 'merci beaucoup', english: 'thank you very much', chinese: '非常感谢', category: 'expression', frequency: 48 },
  { id: 'e4', french: 'excusez-moi', english: 'excuse me', chinese: '打扰一下', category: 'expression', frequency: 47 },
  { id: 'e5', french: 'comment allez-vous?', english: 'how are you?', chinese: '你好吗？', category: 'expression', frequency: 46 },
  { id: 'e6', french: 'je m\'appelle...', english: 'my name is...', chinese: '我叫...', category: 'expression', frequency: 45 },
  { id: 'e7', french: 'je suis désolé', english: "I'm sorry", chinese: '对不起', category: 'expression', frequency: 44 },
  { id: 'e8', french: 'au revoir', english: 'goodbye', chinese: '再见', category: 'expression', frequency: 43 },
  { id: 'e9', french: 'bonne nuit', english: 'good night', chinese: '晚安', category: 'expression', frequency: 42 },
  { id: 'e10', french: 'bonne journée', english: 'have a good day', chinese: '祝你有美好的一天', category: 'expression', frequency: 41 },
  { id: 'e11', french: 'à bientôt', english: 'see you soon', chinese: '待会儿见', category: 'expression', frequency: 40 },
  { id: 'e12', french: 'je ne sais pas', english: "I don't know", chinese: '我不知道', category: 'expression', frequency: 39 },
  { id: 'e13', french: 'bien sûr', english: 'of course', chinese: '当然', category: 'expression', frequency: 38 },
  { id: 'e14', french: 'peut-être', english: 'maybe', chinese: '可能', category: 'expression', frequency: 37 },
  { id: 'e15', french: 'c\'est quoi?', english: "what's that?", chinese: '这是什么？', category: 'expression', frequency: 36 },
  { id: 'e16', french: 'combien?', english: 'how much?', chinese: '多少钱？', category: 'expression', frequency: 35 },
  { id: 'e17', french: 'où est...?', english: 'where is...?', chinese: '...在哪里？', category: 'expression', frequency: 34 },
  { id: 'e18', french: 'quand?', english: 'when?', chinese: '什么时候？', category: 'expression', frequency: 33 },
  { id: 'e19', french: 'pourquoi?', english: 'why?', chinese: '为什么？', category: 'expression', frequency: 32 },
  { id: 'e20', french: 'comment?', english: 'how?', chinese: '怎么？', category: 'expression', frequency: 31 },
  { id: 'e21', french: 'je voudrais...', english: 'I would like...', chinese: '我想要...', category: 'expression', frequency: 30 },
  { id: 'e22', french: 'je besoin de...', english: 'I need...', chinese: '我需要...', category: 'expression', frequency: 29 },
  { id: 'e23', french: 'parlez-vous anglais?', english: 'do you speak English?', chinese: '你会说英语吗？', category: 'expression', frequency: 28 },
  { id: 'e24', french: 'je ne parle pas français', english: "I don't speak French", chinese: '我不会说法语', category: 'expression', frequency: 27 },
  { id: 'e25', french: 'compressez lentement', english: 'speak slowly', chinese: '请说慢一点', category: 'expression', frequency: 26 },
  { id: 'e26', french: 'répétez s\'il vous plaît', english: 'please repeat', chinese: '请再说一遍', category: 'expression', frequency: 25 },
  { id: 'e27', french: 'est-ce que...?', english: 'does...?', chinese: '...吗？', category: 'expression', frequency: 24 },
  { id: 'e28', french: 'je peux aider?', english: 'can I help?', chinese: '我能帮忙吗？', category: 'expression', frequency: 23 },
  { id: 'e29', french: 'avec plaisir', english: 'with pleasure', chinese: '很乐意', category: 'expression', frequency: 22 },
  { id: 'e30', french: 'd\'accord', english: 'okay/agreed', chinese: '好的', category: 'expression', frequency: 21 }
];

// 按类别获取词汇
export function getVocabularyByCategory(category: VocabularyItem['category']): VocabularyItem[] {
  return vocabularyData.filter(v => v.category === category);
}

// 按ID获取词汇
export function getVocabularyById(id: string): VocabularyItem | undefined {
  return vocabularyData.find(v => v.id === id);
}

// 获取常用词汇
export function getFrequentVocabulary(limit: number = 50): VocabularyItem[] {
  return [...vocabularyData]
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, limit);
}

// 转换为Card格式用于闪卡学习
export function vocabularyToCard(item: VocabularyItem): Card {
  return {
    id: item.id,
    front: item.example ? item.example : item.french,
    back: item.french,
    hint: item.phonetic,
    example: item.example,
    exampleTranslation: item.exampleTranslation,
    repetitions: 0,
    interval: 0,
    easeFactor: 2.5,
    dueDate: new Date(),
    verbGroup: item.verbGroup
  };
}