"""empty message

Revision ID: e8e014a8b519
Revises: 2ff9cd91cec3
Create Date: 2024-03-14 15:21:03.026838

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e8e014a8b519'
down_revision = '2ff9cd91cec3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Appointments_table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('start_time', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('end_time', sa.String(), nullable=True))
        batch_op.drop_column('time')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Appointments_table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('time', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('end_time')
        batch_op.drop_column('start_time')

    # ### end Alembic commands ###
