"""empty message

Revision ID: 963c7feb20ac
Revises: 371476d28b9e
Create Date: 2024-03-21 12:11:33.340999

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '963c7feb20ac'
down_revision = '371476d28b9e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Therapists_table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_password_hash', sa.String(), nullable=True))
        batch_op.drop_column('password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Therapists_table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('_password_hash')

    # ### end Alembic commands ###
