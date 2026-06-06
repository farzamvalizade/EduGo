import random
from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string
from subjects.models import Subject, LessonStage
from questions.models import Question, Choice


class Command(BaseCommand):
    help = "ایجاد خودکار ۲ درس، ۲۰ مرحله (هر درس ۱۰ مرحله) و ۶۰ سوال (هر مرحله ۳ سوال)"

    def handle(self, *args, **options):
        Subject.objects.all().delete()
        self.stdout.write("داده‌های قبلی پاک شد.")

        # ----- ۱. ایجاد دو درس -----
        math_subj = Subject.objects.create(
            title="ریاضی",
            description="درس ریاضی پایه هفتم تا نهم",
            image="subjects/math.jpg",
            is_active=True,
        )
        eng_subj = Subject.objects.create(
            title="زبان انگلیسی",
            description="درس زبان انگلیسی پایه هفتم تا نهم",
            image="subjects/english.jpg",
            is_active=True,
        )
        self.stdout.write(
            self.style.SUCCESS(
                f"درس‌ها: {math_subj.title} و {eng_subj.title} ساخته شدند."
            )
        )

        math_stages_data = [
            {
                "title": "اعداد صحیح",
                "content": "جمع و تفریق اعداد صحیح، مقایسه و محور اعداد",
            },
            {
                "title": "کسرها و اعداد اعشاری",
                "content": "تبدیل کسر به اعشار، ساده‌سازی کسرها",
            },
            {"title": "معادله خطی", "content": "حل معادلات یک مجهولی، عبارات جبری"},
            {"title": "هندسه مقدماتی", "content": "زاویه‌ها، مثلث‌ها، مساحت و محیط"},
            {"title": "توان و جذر", "content": "توان‌های صحیح، جذر اعداد مربع کامل"},
            {"title": "درصد و نسبت", "content": "محاسبه درصد، نسبت و تناسب"},
            {"title": "دستگاه معادلات", "content": "روش جایگذاری و حذفی برای دو مجهول"},
            {"title": "احتمال و آمار", "content": "محاسبه احتمال ساده، میانگین و مد"},
            {
                "title": "چندضلعی‌ها",
                "content": "تشخیص انواع چندضلعی‌ها، محاسبه زوایای داخلی",
            },
            {"title": "عبارت‌های جبری", "content": "اتحادها، فاکتورگیری ساده"},
        ]

        eng_stages_data = [
            {"title": "زمان حال ساده", "content": "کاربرد و ساختار Present Simple"},
            {
                "title": "زمان گذشته ساده",
                "content": "افعال با قاعده و بی‌قاعده در Past Simple",
            },
            {"title": "ضمایر فاعلی و مفعولی", "content": "Subject & Object Pronouns"},
            {
                "title": "صفات ملکی",
                "content": "Possessive Adjectives (my, your, his, her, etc.)",
            },
            {"title": "حرف تعریف", "content": "کاربرد a, an, the"},
            {"title": "جمع بستن اسم‌ها", "content": "قوانین جمع بستن و استثناها"},
            {"title": "قیدهای تکرار", "content": "always, usually, sometimes, never"},
            {"title": "سوالات Wh-", "content": "what, where, when, why, who, how"},
            {"title": "حروف اضافه مکان", "content": "in, on, at, under, behind"},
            {
                "title": "صفت‌های تفضیلی",
                "content": "comparative and superlative adjectives",
            },
        ]

        def create_questions_for_stage(stage, stage_index, subject_name):
            """ساخت ۳ سوال برای یک مرحله (subject_name = 'math' یا 'eng')"""
            questions_data = []

            if subject_name == "math":
                math_questions = [
                    [
                        {
                            "text": "حاصل ۵- (۳-) برابر است با:",
                            "type": "multiple-choice",
                            "choices": ["2-", "2", "8-", "8"],
                            "correct": 1,
                        },
                        {
                            "text": "کدام گزینه عددی صحیح و مثبت است؟",
                            "type": "multiple-choice",
                            "choices": ["۵-", "۰", "۳+", "۷-"],
                            "correct": 2,
                        },
                        {
                            "text": "فاصلهٔ عدد ۴- تا ۳ روی محور چند واحد است؟",
                            "type": "multiple-choice",
                            "choices": ["۱", "۷", "۱-", "۷-"],
                            "correct": 1,
                        },
                    ],
                    [
                        {
                            "text": "حاصل ۱/۲ + ۱/۳ کدام است؟",
                            "type": "multiple-choice",
                            "choices": ["2/5", "5/6", "1/6", "3/5"],
                            "correct": 1,
                        },
                        {
                            "text": "کدام کسر بزرگتر از ۱ است؟",
                            "type": "multiple-choice",
                            "choices": ["3/4", "5/7", "9/8", "2/3"],
                            "correct": 2,
                        },
                        {
                            "text": "عدد 0.75 به صورت کسر ساده شده کدام است؟",
                            "type": "multiple-choice",
                            "choices": ["3/4", "1/4", "4/3", "2/3"],
                            "correct": 0,
                        },
                    ],
                    [
                        {
                            "text": "معادله 2x = 10 را حل کنید. x=؟",
                            "type": "multiple-choice",
                            "choices": ["5", "10", "20", "0.5"],
                            "correct": 0,
                        },
                        {
                            "text": "جواب معادله 3x + 2 = 11 کدام است؟",
                            "type": "multiple-choice",
                            "choices": ["3", "4", "5", "2"],
                            "correct": 0,
                        },
                        {
                            "text": "در معادله 5x - 4 = 2x + 8، مقدار x برابر است با:",
                            "type": "multiple-choice",
                            "choices": ["2", "3", "4", "5"],
                            "correct": 2,
                        },
                    ],
                    [
                        {
                            "text": "مجموع زوایای داخلی یک مثلث چند درجه است؟",
                            "type": "multiple-choice",
                            "choices": ["90", "180", "270", "360"],
                            "correct": 1,
                        },
                        {
                            "text": "مساحت مربعی به ضلع 4 سانتی متر چقدر است؟",
                            "type": "multiple-choice",
                            "choices": ["8", "12", "16", "20"],
                            "correct": 2,
                        },
                        {
                            "text": "در یک مثلث قائم‌الزاویه، وتر بلندترین ضلع است. (صحیح/غلط)",
                            "type": "true-or-false",
                            "choices": ["صحیح", "غلط"],
                            "correct": 0,
                        },
                    ],
                    [
                        {
                            "text": "حاصل 2^3 برابر با:",
                            "type": "multiple-choice",
                            "choices": ["6", "8", "9", "5"],
                            "correct": 1,
                        },
                        {
                            "text": "√16 چند است؟",
                            "type": "multiple-choice",
                            "choices": ["2", "4", "8", "16"],
                            "correct": 1,
                        },
                        {
                            "text": "حاصل (2³) × (1³) کدام است؟",
                            "type": "multiple-choice",
                            "choices": ["9", "27", "81", "243"],
                            "correct": 1,
                        },
                    ],
                    [
                        {
                            "text": "۲۰ درصد از ۸۰ برابر است با:",
                            "type": "multiple-choice",
                            "choices": ["10", "12", "16", "20"],
                            "correct": 2,
                        },
                        {
                            "text": "نسبت ۳ به ۴ یعنی چند درصد؟",
                            "type": "multiple-choice",
                            "choices": ["25%", "50%", "75%", "100%"],
                            "correct": 2,
                        },
                        {
                            "text": "اگر 30% از یک عدد برابر 15 باشد، آن عدد کدام است؟",
                            "type": "multiple-choice",
                            "choices": ["50", "45", "35", "25"],
                            "correct": 0,
                        },
                    ],
                    [
                        {
                            "text": "دستگاه x+y=5 و x-y=1 را حل کنید. x=؟",
                            "type": "multiple-choice",
                            "choices": ["2", "3", "4", "1"],
                            "correct": 1,
                        },
                        {
                            "text": "جواب دستگاه y=2x و x+y=6 کدام است؟",
                            "type": "multiple-choice",
                            "choices": ["(1,2)", "(2,4)", "(3,6)", "(0,0)"],
                            "correct": 1,
                        },
                        {
                            "text": "آیا نقطه (1,2) در معادله y=2x صدق می‌کند؟",
                            "type": "true-or-false",
                            "choices": ["صحیح", "غلط"],
                            "correct": 0,
                        },
                    ],
                    [
                        {
                            "text": "در پرتاب یک تاس سالم، احتمال آمدن عدد زوج چقدر است؟",
                            "type": "multiple-choice",
                            "choices": ["1/2", "1/3", "2/3", "1/6"],
                            "correct": 0,
                        },
                        {
                            "text": "میانگین اعداد 4، 8، 6 چیست؟",
                            "type": "multiple-choice",
                            "choices": ["4", "6", "8", "5"],
                            "correct": 1,
                        },
                        {
                            "text": "احتمال حتمی برابر 1 است. (صحیح/غلط)",
                            "type": "true-or-false",
                            "choices": ["صحیح", "غلط"],
                            "correct": 0,
                        },
                    ],
                    [
                        {
                            "text": "چندضلعی با 5 ضلع چه نام دارد؟",
                            "type": "multiple-choice",
                            "choices": ["چهارضلعی", "پنج ضلعی", "شش ضلعی", "هشت ضلعی"],
                            "correct": 1,
                        },
                        {
                            "text": "مجموع زوایای داخلی یک شش ضلعی منتظم چند درجه است؟",
                            "type": "multiple-choice",
                            "choices": ["540", "720", "900", "360"],
                            "correct": 1,
                        },
                        {
                            "text": "مربع یک نوع لوزی است. (صحیح/غلط)",
                            "type": "true-or-false",
                            "choices": ["صحیح", "غلط"],
                            "correct": 0,
                        },
                    ],
                    [
                        {
                            "text": "ساده شده عبارت 3a + 2b - a + 4b کدام است؟",
                            "type": "multiple-choice",
                            "choices": ["2a+6b", "4a+6b", "2a+2b", "4a+2b"],
                            "correct": 0,
                        },
                        {
                            "text": "حاصل ضرب (x+2)(x+3) برابر است با:",
                            "type": "multiple-choice",
                            "choices": ["x²+5x+6", "x²+6x+5", "x²+5", "2x+5"],
                            "correct": 0,
                        },
                        {
                            "text": "عبارت x² - 4 را تجزیه کنید.",
                            "type": "multiple-choice",
                            "choices": [
                                "(x-2)(x-2)",
                                "(x+2)(x-2)",
                                "(x+4)(x-1)",
                                "(x-4)(x+1)",
                            ],
                            "correct": 1,
                        },
                    ],
                ]
                if stage_index < len(math_questions):
                    return math_questions[stage_index]
                else:
                    return []

            elif subject_name == "eng":
                eng_questions = [
                    [
                        {
                            "text": "She _____ to school every day.",
                            "type": "multiple-choice",
                            "choices": ["go", "goes", "going", "went"],
                            "correct": 1,
                        },
                        {
                            "text": "They _____ football on Fridays.",
                            "type": "multiple-choice",
                            "choices": ["play", "plays", "playing", "played"],
                            "correct": 0,
                        },
                        {
                            "text": "He always _____ breakfast at 7 a.m.",
                            "type": "multiple-choice",
                            "choices": ["have", "has", "having", "had"],
                            "correct": 1,
                        },
                    ],
                    [
                        {
                            "text": "I _____ to the cinema yesterday.",
                            "type": "multiple-choice",
                            "choices": ["go", "went", "gone", "goes"],
                            "correct": 1,
                        },
                        {
                            "text": "We _____ a new car last month.",
                            "type": "multiple-choice",
                            "choices": ["buy", "bought", "buyed", "buys"],
                            "correct": 1,
                        },
                        {
                            "text": "Did she _____ her homework? (فعل مناسب)",
                            "type": "multiple-choice",
                            "choices": ["did", "do", "does", "doing"],
                            "correct": 1,
                        },
                    ],
                    [
                        {
                            "text": "_____ am a student.",
                            "type": "multiple-choice",
                            "choices": ["I", "You", "He", "She"],
                            "correct": 0,
                        },
                        {
                            "text": "Please give the book to _____.",
                            "type": "multiple-choice",
                            "choices": ["I", "me", "my", "mine"],
                            "correct": 1,
                        },
                        {
                            "text": "The teacher likes _____. (ما)",
                            "type": "multiple-choice",
                            "choices": ["we", "us", "our", "ours"],
                            "correct": 1,
                        },
                    ],
                    [
                        {
                            "text": "This is _____ book. (من)",
                            "type": "multiple-choice",
                            "choices": ["my", "mine", "I", "me"],
                            "correct": 0,
                        },
                        {
                            "text": "Is that _____ car? (او - مذکر)",
                            "type": "multiple-choice",
                            "choices": ["her", "his", "its", "your"],
                            "correct": 1,
                        },
                        {
                            "text": "These are _____ pencils. (ما)",
                            "type": "multiple-choice",
                            "choices": ["our", "ours", "we", "us"],
                            "correct": 0,
                        },
                    ],
                    [
                        {
                            "text": "I have _____ apple.",
                            "type": "multiple-choice",
                            "choices": ["a", "an", "the", "no article"],
                            "correct": 1,
                        },
                        {
                            "text": "_____ sun is very hot.",
                            "type": "multiple-choice",
                            "choices": ["A", "An", "The", "None"],
                            "correct": 2,
                        },
                        {
                            "text": "She is _____ best student in class.",
                            "type": "multiple-choice",
                            "choices": ["a", "an", "the", "no article"],
                            "correct": 2,
                        },
                    ],
                    [
                        {
                            "text": "One child → two _____",
                            "type": "multiple-choice",
                            "choices": ["childs", "children", "childes", "childrens"],
                            "correct": 1,
                        },
                        {
                            "text": "One box → two _____",
                            "type": "multiple-choice",
                            "choices": ["boxs", "boxies", "boxes", "box"],
                            "correct": 2,
                        },
                        {
                            "text": "One man → two _____",
                            "type": "multiple-choice",
                            "choices": ["mans", "men", "man", "mens"],
                            "correct": 1,
                        },
                    ],
                    [
                        {
                            "text": "He _____ eats breakfast. (معمولاً)",
                            "type": "multiple-choice",
                            "choices": ["always", "usually", "never", "sometimes"],
                            "correct": 1,
                        },
                        {
                            "text": "I _____ drink coffee at night. (هیچ وقت)",
                            "type": "multiple-choice",
                            "choices": ["always", "often", "never", "sometimes"],
                            "correct": 2,
                        },
                        {
                            "text": "They _____ go to the park on Sundays. (گاهی اوقات)",
                            "type": "multiple-choice",
                            "choices": ["always", "never", "sometimes", "rarely"],
                            "correct": 2,
                        },
                    ],
                    [
                        {
                            "text": "_____ is your name?",
                            "type": "multiple-choice",
                            "choices": ["What", "Where", "When", "Who"],
                            "correct": 0,
                        },
                        {
                            "text": "_____ do you live? (کجا)",
                            "type": "multiple-choice",
                            "choices": ["What", "Where", "When", "Why"],
                            "correct": 1,
                        },
                        {
                            "text": "_____ is that girl? (او کیست)",
                            "type": "multiple-choice",
                            "choices": ["What", "Where", "Who", "Why"],
                            "correct": 2,
                        },
                    ],
                    [
                        {
                            "text": "The cat is _____ the table. (زیر)",
                            "type": "multiple-choice",
                            "choices": ["on", "under", "behind", "in"],
                            "correct": 1,
                        },
                        {
                            "text": "She is sitting _____ me. (کنار من)",
                            "type": "multiple-choice",
                            "choices": ["next to", "under", "between", "among"],
                            "correct": 0,
                        },
                        {
                            "text": "He lives _____ Tehran.",
                            "type": "multiple-choice",
                            "choices": ["in", "at", "on", "to"],
                            "correct": 0,
                        },
                    ],
                    [
                        {
                            "text": "This is _____ than that. (بزرگتر)",
                            "type": "multiple-choice",
                            "choices": ["big", "bigger", "biggest", "the big"],
                            "correct": 1,
                        },
                        {
                            "text": "She is the _____ student in class. (باهوش‌ترین)",
                            "type": "multiple-choice",
                            "choices": ["smart", "smarter", "smartest", "more smart"],
                            "correct": 2,
                        },
                        {
                            "text": "My car is _____ than yours. (ارزان‌تر)",
                            "type": "multiple-choice",
                            "choices": ["cheap", "cheaper", "cheapest", "more cheap"],
                            "correct": 1,
                        },
                    ],
                ]
                if stage_index < len(eng_questions):
                    return eng_questions[stage_index]
                else:
                    return []
            return []

        xp_list = [10, 15, 20, 25, 30, 35, 40, 45, 50, 60]

        for idx, stage_info in enumerate(math_stages_data):
            order = idx + 1
            stage = LessonStage.objects.create(
                subject=math_subj,
                title=stage_info["title"],
                order=order,
                content=stage_info["content"],
                pass_score=2,
                xp_reward=xp_list[idx] if idx < len(xp_list) else 20,
                is_active=True,
            )
            q_list = create_questions_for_stage(stage, idx, "math")
            for q_order, q_data in enumerate(q_list, start=1):
                question = Question.objects.create(
                    stage=stage,
                    title=q_data["text"],
                    type=q_data["type"],
                    order=q_order,
                )
                choices_text = q_data["choices"]
                correct_index = q_data["correct"]
                for ch_idx, ch_text in enumerate(choices_text):
                    Choice.objects.create(
                        question=question,
                        text=ch_text,
                        is_correct=(ch_idx == correct_index),
                    )
            self.stdout.write(
                f"مرحله {order}: {stage.title} (ریاضی) با {q_list.__len__()} سوال ساخته شد."
            )

        for idx, stage_info in enumerate(eng_stages_data):
            order = idx + 1
            stage = LessonStage.objects.create(
                subject=eng_subj,
                title=stage_info["title"],
                order=order,
                content=stage_info["content"],
                pass_score=2,
                xp_reward=xp_list[idx] if idx < len(xp_list) else 20,
                is_active=True,
            )
            q_list = create_questions_for_stage(stage, idx, "eng")
            for q_order, q_data in enumerate(q_list, start=1):
                question = Question.objects.create(
                    stage=stage,
                    title=q_data["text"],
                    type=q_data["type"],
                    order=q_order,
                )
                choices_text = q_data["choices"]
                correct_index = q_data["correct"]
                for ch_idx, ch_text in enumerate(choices_text):
                    Choice.objects.create(
                        question=question,
                        text=ch_text,
                        is_correct=(ch_idx == correct_index),
                    )
            self.stdout.write(
                f"مرحله {order}: {stage.title} (انگلیسی) با {q_list.__len__()} سوال ساخته شد."
            )

        self.stdout.write(
            self.style.SUCCESS(
                "✅ عملیات با موفقیت انجام شد. ۲ درس، ۲۰ مرحله و ۶۰ سوال ایجاد گردید."
            )
        )
