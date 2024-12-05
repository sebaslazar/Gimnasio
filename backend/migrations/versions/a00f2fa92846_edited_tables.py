"""Edited tables

Revision ID: a00f2fa92846
Revises: 5d3e3040618a
Create Date: 2024-12-05 11:49:52.698215

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a00f2fa92846'
down_revision: Union[str, None] = '5d3e3040618a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('compra_membresia_ID_comprador_fkey', 'compra_membresia', type_='foreignkey')
    op.create_foreign_key(None, 'compra_membresia', 'cliente', ['ID_comprador'], ['ID_cliente'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'compra_membresia', type_='foreignkey')
    op.create_foreign_key('compra_membresia_ID_comprador_fkey', 'compra_membresia', 'cliente', ['ID_comprador'], ['ID_cliente'], ondelete='SET NULL')
    # ### end Alembic commands ###