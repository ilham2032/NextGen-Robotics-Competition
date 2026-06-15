from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("teams", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="member",
            name="mentor",
            field=models.ForeignKey(
                blank=True,
                db_column="mentor_id",
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="members",
                to="teams.mentor",
            ),
        ),
    ]
