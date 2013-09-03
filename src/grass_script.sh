#arguments:

# $1 nort
# $2 south
# $3 east
# $4 west
# $5 rows
# $6 cols
# $7 ID

# path to GRASS binaries and libraries:
export GISBASE=/usr/lib/grass64

export PATH=$PATH:$GISBASE/bin:$GISBASE/scripts
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$GISBASE/lib

# use process ID (PID) as lock file number:
export GIS_LOCK=$$

# path to GRASS settings file
#defines: location and map set among other things
export GISRC=/home/ubuntu/.grassrc6

# The following three settings are only recommended if you will be calling
# the script from another program - e.g. a PHP web page using system() or exec()
#export HOME=/var/www
#export USER=www-data
#export GROUP=www-data

#Set region for the map "crop": set user defined N S E W boundaries and don't mess with the 
g.region n=$1 s=$2 e=$3 w=$4 nsres=82.05357896 ewres=82.05357896

#Use resample to crop the map 
r.resample --overwrite input=srtm_35_04_proj@PERMANENT output=croped_$7

#user set region again to increase the resolution to the required number of columns and rows
g.region rows=$5 cols=$6

#Use resample by multiple methods to interpolate the map to the desired resolution
r.resamp.interp --overwrite input=croped_$7@PERMANENT output=resamp$7 method=bilinear

#compute slope and aspect
r.slope.aspect --overwrite elevation=resamp$7@PERMANENT slope=srtm$7_slope aspect=srtm$7_aspect format=percent

#print maps - dp=2 (2 decimal digits) null=0 (null values are printed as 0)
r.out.ascii input=srtm$7_aspect@PERMANENT output=./srtm$7_aspect.grass dp=2 null=0
r.out.ascii input=srtm$7_slope@PERMANENT output=./srtm$7_slope.grass dp=2 null=0
r.out.ascii input=resamp$7@PERMANENT output=./srtm$7_height.grass dp=2 null=0


#Remove maps
g.remove rast=croped_$7@PERMANENT,resamp$7@PERMANENT,srtm$7_slope@PERMANENT,srtm$7_aspect@PERMANENT