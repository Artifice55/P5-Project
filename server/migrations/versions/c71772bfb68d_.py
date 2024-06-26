"""empty message

Revision ID: c71772bfb68d
Revises: 097f91a46260
Create Date: 2024-03-21 11:15:21.528552

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c71772bfb68d'
down_revision = '097f91a46260'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Appointments_table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('phoneNumber', sa.String(), nullable=True))
        batch_op.drop_column('status')
        batch_op.drop_column('duration')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Appointments_table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('duration', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('status', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('phoneNumber')

    # ### end Alembic commands ###
