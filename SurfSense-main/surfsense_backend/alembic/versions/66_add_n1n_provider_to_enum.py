"""Add N1N provider to LiteLLMProvider enum

Revision ID: 66
Revises: 65
"""

from collections.abc import Sequence

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "66"
down_revision: str | None = "65"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    """
    Add N1N provider to LiteLLMProvider enum.
    """
    op.execute(
        """
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM pg_enum
                WHERE enumtypid = 'litellmprovider'::regtype
                AND enumlabel = 'N1N'
            ) THEN
                ALTER TYPE litellmprovider ADD VALUE 'N1N';
            END IF;
        END$$;
        """
    )


def downgrade() -> None:
    """
    PostgreSQL doesn't support removing enum values directly.
    """
    pass
