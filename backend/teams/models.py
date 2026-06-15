from django.db import models


class Category(models.Model):
    """Competition category (Mini Sumo, Line Follower, etc.)."""

    id = models.CharField(max_length=64, primary_key=True)
    name = models.CharField(max_length=120, unique=True)
    description = models.TextField(blank=True, default="")
    pdf_name = models.CharField(max_length=200, blank=True, default="")
    pdf_data_url = models.CharField(max_length=500, blank=True, default="")
    age_min = models.PositiveSmallIntegerField(null=True, blank=True)
    age_max = models.PositiveSmallIntegerField(null=True, blank=True)
    max_members = models.PositiveSmallIntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "categories"

    def __str__(self) -> str:
        return self.name


class Mentor(models.Model):
    """Team mentor / coach who registers participants."""

    id = models.CharField(max_length=64, primary_key=True)
    name = models.CharField(max_length=120)
    surname = models.CharField(max_length=120)
    fin = models.CharField(max_length=12, db_index=True)
    email = models.EmailField(unique=True)
    date_of_birth = models.CharField(max_length=20)
    country = models.CharField(max_length=120)
    phone = models.CharField(max_length=20, blank=True, default="")
    password_hash = models.CharField(max_length=256, blank=True, default="")
    password_salt = models.CharField(max_length=64, blank=True, default="")
    registered_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-registered_at"]

    def __str__(self) -> str:
        return f"{self.name} {self.surname}"

    @property
    def full_name(self) -> str:
        return f"{self.name} {self.surname}"


class Member(models.Model):
    """Individual participant registered by a mentor."""

    id = models.CharField(max_length=64, primary_key=True)
    mentor = models.ForeignKey(
        Mentor,
        on_delete=models.SET_NULL,
        related_name="members",
        db_column="mentor_id",
        null=True,
        blank=True,
    )
    name = models.CharField(max_length=120)
    surname = models.CharField(max_length=120)
    age = models.PositiveSmallIntegerField()
    fin = models.CharField(max_length=12, db_index=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name", "surname"]
        constraints = [
            models.UniqueConstraint(
                fields=["mentor", "email"],
                name="unique_member_email_per_mentor",
            ),
        ]

    def __str__(self) -> str:
        return f"{self.name} {self.surname}"

    @property
    def full_name(self) -> str:
        return f"{self.name} {self.surname}"


class Team(models.Model):
    """Registered robotics team."""

    PAYMENT_PENDING = "pending"
    PAYMENT_PAID = "paid"
    PAYMENT_STATUS_CHOICES = [
        (PAYMENT_PENDING, "Pending"),
        (PAYMENT_PAID, "Paid"),
    ]

    PAYMENT_CARD = "card"
    PAYMENT_BANK = "bank_transfer"
    PAYMENT_METHOD_CHOICES = [
        (PAYMENT_CARD, "Card"),
        (PAYMENT_BANK, "Bank transfer"),
    ]

    id = models.CharField(max_length=64, primary_key=True)
    name = models.CharField(max_length=200)
    school = models.CharField(max_length=200, help_text="Country or organization name")
    description = models.TextField(blank=True, default="")
    category_name = models.CharField(max_length=120, blank=True, default="")
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="teams",
    )
    mentor = models.ForeignKey(
        Mentor,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="teams",
        db_column="mentor_id",
    )
    mentor_name = models.CharField(max_length=240, blank=True, default="")
    members = models.ManyToManyField(Member, related_name="teams", blank=True)
    member_count = models.PositiveSmallIntegerField(default=0)
    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS_CHOICES,
        blank=True,
        default="",
    )
    payment_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
    )
    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHOD_CHOICES,
        blank=True,
        default="",
    )
    paid_at = models.DateTimeField(null=True, blank=True)
    group = models.CharField(max_length=10, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.name

    def refresh_member_count(self) -> None:
        count = self.members.count()
        if self.member_count != count:
            self.member_count = count
            self.save(update_fields=["member_count", "updated_at"])
