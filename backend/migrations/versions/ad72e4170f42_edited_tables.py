"""Edited tables

Revision ID: ad72e4170f42
Revises: fbee286b3225
Create Date: 2024-11-17 23:30:43.422253

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = 'ad72e4170f42'
down_revision: Union[str, None] = 'fbee286b3225'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Paso 1: Eliminar restricción de clave foránea en `compra_membresia`
    op.drop_constraint('compra_membresia_ID_membresia_fkey', 'compra_membresia', type_='foreignkey')

    # Paso 2: Cambiar tipo de columna en ambas tablas
    op.alter_column('membresia', 'ID_membresia',
                    existing_type=sa.INTEGER(),
                    type_=sa.String(),
                    existing_nullable=False)

    op.alter_column('compra_membresia', 'ID_membresia',
                    existing_type=sa.INTEGER(),
                    type_=sa.String(),
                    existing_nullable=False)

    # Paso 3: Restaurar la restricción de clave foránea
    op.create_foreign_key('compra_membresia_ID_membresia_fkey', 'compra_membresia', 'membresia', ['ID_membresia'],
                          ['ID_membresia'])


def downgrade() -> None:
    # Revertir los cambios en orden inverso

    # Paso 1: Eliminar la restricción de clave foránea
    op.drop_constraint('compra_membresia_ID_membresia_fkey', 'compra_membresia', type_='foreignkey')

    # Paso 2: Revertir el tipo de columna en ambas tablas
    op.alter_column('compra_membresia', 'ID_membresia',
                    existing_type=sa.String(),
                    type_=sa.INTEGER(),
                    existing_nullable=False)

    op.alter_column('membresia', 'ID_membresia',
                    existing_type=sa.String(),
                    type_=sa.INTEGER(),
                    existing_nullable=False)

    # Paso 3: Restaurar la restricción de clave foránea
    op.create_foreign_key('compra_membresia_ID_membresia_fkey', 'compra_membresia', 'membresia', ['ID_membresia'],
                          ['ID_membresia'])
