"""empty message

Revision ID: 2ff9cd91cec3
Revises: e352067d7fe7
Create Date: 2024-03-14 13:26:21.996814

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2ff9cd91cec3'
down_revision = 'e352067d7fe7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Patients_table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('gender', sa.String(), nullable=True))
        batch_op.drop_column('Gender')

    with op.batch_alter_table('Therapists_table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('state', sa.String(), nullable=True))
        batch_op.drop_column('State')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Therapists_table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('State', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('state')

    with op.batch_alter_table('Patients_table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('Gender', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('gender')

    # ### end Alembic commands ###