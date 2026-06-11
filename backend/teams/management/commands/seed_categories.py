from django.core.management.base import BaseCommand

from teams.models import Category

DEFAULT_CATEGORIES = [
    {
        "id": "cat-1",
        "name": "Mini Sumo",
        "description": "Robots battle in a circular arena to push each other out.",
        "pdf_name": "Mini Sumo Regulations",
        "pdf_data_url": "regs/mini-sumo.pdf",
        "max_members": 3,
        "age_min": 18,
        "age_max": 30,
    },
    {
        "id": "cat-2",
        "name": "Mini Sumo Kids",
        "description": "Mini Sumo competition designed for younger participants.",
        "pdf_name": "Mini Sumo Kids Regulations",
        "pdf_data_url": "regs/mini-sumo-kids.pdf",
        "max_members": 3,
        "age_min": 13,
        "age_max": 17,
    },
    {
        "id": "cat-3",
        "name": "Mega Sumo",
        "description": "Larger robots compete in sumo wrestling matches.",
        "pdf_name": "Mega Sumo Regulations",
        "pdf_data_url": "regs/mega-sumo.pdf",
        "max_members": 2,
        "age_min": 18,
        "age_max": 30,
    },
    {
        "id": "cat-4",
        "name": "Lego Line",
        "description": "Robots follow a line course using LEGO components.",
        "pdf_name": "Lego Line Regulations",
        "pdf_data_url": "regs/lego-line.pdf",
        "max_members": 3,
        "age_min": 8,
        "age_max": 12,
    },
    {
        "id": "cat-5",
        "name": "Line Follower",
        "description": "Autonomous robots navigate complex line courses.",
        "pdf_name": "Line Follower Regulations",
        "pdf_data_url": "regs/line-follower.pdf",
        "max_members": 3,
        "age_min": 13,
        "age_max": 18,
    },
    {
        "id": "cat-6",
        "name": "1kg Lego Sumo",
        "description": "1kg LEGO robots compete in sumo battles.",
        "pdf_name": "1kg Lego Sumo Regulations",
        "pdf_data_url": "regs/1kg-lego-sumo.pdf",
        "max_members": 3,
        "age_min": 8,
        "age_max": 12,
    },
    {
        "id": "cat-7",
        "name": "3kg Lego Sumo",
        "description": "3kg LEGO robots compete in sumo battles.",
        "pdf_name": "3kg Lego Sumo Regulations",
        "pdf_data_url": "regs/3kg-lego-sumo.pdf",
        "max_members": 3,
        "age_min": 8,
        "age_max": 12,
    },
    {
        "id": "cat-8",
        "name": "Start Up Senior",
        "description": "Senior startup robotics competition.",
        "pdf_name": "",
        "pdf_data_url": "",
        "max_members": 3,
        "age_min": 18,
        "age_max": 25,
    },
]


class Command(BaseCommand):
    help = "Seed default competition categories."

    def handle(self, *args, **options):
        created = 0
        updated = 0
        for entry in DEFAULT_CATEGORIES:
            _obj, was_created = Category.objects.update_or_create(
                id=entry["id"],
                defaults=entry,
            )
            if was_created:
                created += 1
            else:
                updated += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Categories seeded: {created} created, {updated} updated.",
            ),
        )
